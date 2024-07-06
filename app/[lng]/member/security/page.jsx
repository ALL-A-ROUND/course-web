"use client"
import useUser from "@/app/[lng]/useUser";
import {api} from "@/app/[lng]/utils";
import {KeyIcon} from "@heroicons/react/24/outline";

export default function SecurityPage() {
    String.prototype.toURLSafe = function () {
        return this.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    String.prototype.toURLUnsafe = function () {
        let new_string = this.replace(/-/g, '+').replace(/_/g, '/');
        while (new_string.length % 4)
            new_string += '=';
        return new_string;
    };

    ArrayBuffer.prototype.toBase64 = function () {
        return btoa([].reduce.call(new Uint8Array(this), function (p, c) {
            return p + String.fromCharCode(c)
        }, '')).toURLSafe();
    };
    const {user} = useUser()
    const create = async () => {
        api('GET', '/passkey/list', {}).then((data) => {
            console.log(user)
            api('GET', '/passkey/challenge', {}).then(async ({challenge}) => {
                const publicKeyCredentialCreationOptions = {
                    challenge: Uint8Array.from(
                        atob(challenge
                            .replace(/-/g, '+')
                            .replace(/_/g, '/')), c => c.charCodeAt(0)
                    ),
                    rp: {
                        name: process.env.NEXT_PUBLIC_APP_NAME,
                        id: process.env.NEXT_PUBLIC_PASSKEY_RPID,
                    },
                    user: {
                        id: Uint8Array.from(user?.id, c => c.charCodeAt(0)),
                        name: user?.name,
                        displayName: user?.name,
                    },
                    pubKeyCredParams: [{alg: -7, type: "public-key"}],
                    excludeCredentials: data.map((passkey) => ({
                        id: Uint8Array.from(passkey.id, c => c.charCodeAt(0)),
                        type: "public-key",
                        transports: ["internal"],
                    })),
                    authenticatorSelection: {
                        requireResidentKey: true,
                    }
                }

                const credential = await navigator.credentials.create({
                    publicKey: publicKeyCredentialCreationOptions
                });
                const response = credential.response;
                api('POST', '/passkey/register', {
                    credential_id: credential.id,
                    public_key: response.getPublicKey().toBase64(),
                    public_key_algo: response.getPublicKeyAlgorithm(),
                    challenge: JSON.parse(new TextDecoder("utf-8").decode(response.clientDataJSON)).challenge,
                })
            })
        })
    }
    return (
        <div>
            <button onClick={create} className={"flex items-center gap-2"}>Create a Passkey <KeyIcon
                className={"h-5 w-5"}/></button>
        </div>
    )
}
