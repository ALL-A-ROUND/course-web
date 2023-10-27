"use client";
import Title from "@/app/auth/Title";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {KeyIcon} from "@heroicons/react/24/outline";
import {api} from "@/app/utils";

export default function ({children}) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            if (res.status === 200)
                router.replace('/')
            // else
            //     localStorage.removeItem("token")
        })
    })

    const signInWithPasskey = () => {
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

        // fetch challenge
        let rpId = process.env.NEXT_PUBLIC_PASSKEY_RPID;

        api('GET', '/passkey/challenge').then(({challenge}) => {
            if (window.PublicKeyCredential && PublicKeyCredential.isConditionalMediationAvailable) {
                Promise.all([
                    PublicKeyCredential.isConditionalMediationAvailable()
                ]).then(async (results) => {
                    if (results.every(r => r === true)) {
                        const publicKeyCredentialRequestOptions = {
                            challenge: Uint8Array.from(
                                atob(challenge
                                    .replace(/-/g, '+')
                                    .replace(/_/g, '/')), c => c.charCodeAt(0)
                            ),
                            // The same RP ID as used during registration
                            rpId,
                        };

                        const credential = await navigator.credentials.get({
                            publicKey: publicKeyCredentialRequestOptions,
                            mediation: 'conditional'
                        });
                        const response = credential.response;
                        console.log(response);

                        api("POST", "/passkey/login", {
                            credential_id: credential.id,
                            challenge: JSON.parse(new TextDecoder("utf-8").decode(response.clientDataJSON)).challenge,
                            signature: response.signature.toBase64(),
                            userHandle: response.userHandle.toBase64(),
                            clientDataJSON: response.clientDataJSON.toBase64(),
                            authenticatorData: response.authenticatorData.toBase64(),
                        }).then(({token}) => {
                            localStorage.setItem("token", token)
                            router.push('/')
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            }
        })
    }

    return (
        <>
            <div className="flex min-h-full">
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-12 w-auto rounded-xl"
                                src="/logo.webp"
                                alt="Your Company"
                            />
                            <Title/>
                        </div>

                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">第三方登入</p>

                                    <div className="mt-1 grid grid-cols-3 gap-3">
                                        {pathname === "/auth/login" && (<div>
                                            <button onClick={signInWithPasskey}
                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with Passkey</span>

                                                <KeyIcon className="text-gray-500 h-5 w-5"/>
                                            </button>
                                        </div>)}

                                        <div>
                                            <Link
                                                href={process.env.NEXT_PUBLIC_API_ENDPOINT + "/../oauth/google"}
                                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with Google</span>
                                                <svg className="text-gray-500 h-5 w-5" role="img" fill="currentColor"
                                                     viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg"><title>Google</title>
                                                    <path
                                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                                                </svg>
                                            </Link>
                                        </div>

                                        <div>
                                            <Link
                                                href={process.env.NEXT_PUBLIC_API_ENDPOINT + "/../oauth/github"}
                                                className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with GitHub</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">或使用電子郵件繼續</span>
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
