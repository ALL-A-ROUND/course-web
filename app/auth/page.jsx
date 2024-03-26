"use client"
import {auth} from "@/lib/firebase/firebase";
import {useRouter} from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithRedirect,
} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {QrCodeIcon} from "@heroicons/react/24/solid";
import QRCode from "react-qr-code";
import {api} from "@/app/utils";
import {ArrowPathIcon, ArrowPathRoundedSquareIcon, CheckCircleIcon, CheckIcon} from "@heroicons/react/24/outline";

const {detect} = require('detect-browser');
const browser = detect();

export default function Auth() {
    const router = useRouter()
    const [user, loading] = useAuthState(auth);

    const emailLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password).then(user => {
            if (user)
                router.replace("/course")
        }).catch(e => {
            if (e.code === "auth/user-not-found" || e.code === "auth/invalid-credential") {
                createUserWithEmailAndPassword(auth, email, password).then(user => {
                    if (user)
                        router.replace("/course")
                }).catch(e => {
                    alert(e.message)
                })
            } else {
                alert(e.message)
            }
        })
    }

    useEffect(() => {
        if (user) {
            router.replace("/course")
        }
    }, [user])
    const [loadingQr, setLoadingQr] = useState(false)
    const [isForgot, setIsForgot] = useState(false)
    const [qrID, setQrID] = useState("")
    const [showQR, setShowQR] = useState(false)
    const [qrTimer, setQrTimer] = useState(null)
    const [qrAuth, setQrAuth] = useState(null)
    const callGen = () => {
        api("POST", "/auth/qrcode/gen").then(res => {
            setQrID(res.uuid)
            localStorage?.setItem('qrID', res.uuid)
        })
    }
    const generateQR = () => {
        const id = localStorage?.getItem('qrID')
        setLoadingQr(true)
        if (id) {
            api("GET", `/auth/qrcode/${id}/status`).then(res => {
                if (res.status === "linked" || res.status === "scanned") {
                    // is used, re-generate
                    callGen()
                } else {
                    setQrID(id)
                }
            })
        } else {
            callGen()
        }
    }

    useEffect(() => {
        if (qrID) {
            const func = () => {
                api("GET", `/auth/qrcode/${qrID}/status`).then(res => {
                    setQrAuth(res)
                    setShowQR(true)
                    setLoadingQr(false)
                    if (res.status === "linked") {
                        clearInterval(qrTimer)
                        signInWithCustomToken(auth, res.token).then(user => {
                            if (user)
                                router.replace("/course")
                        })
                    }
                })
            }
            setQrTimer(setInterval(func, 1000))
            func()
        }
        return () => {
            clearInterval(qrTimer)
        }
    }, [qrID]);

    const signIn = () => {
        if (browser?.name === "safari") {
            signInWithRedirect(auth, new GoogleAuthProvider())
        } else {
            signInWithPopup(auth, new GoogleAuthProvider())
        }
    }

    const forgotPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordResetEmail(auth, email).then(() => {
            alert("已發送重設密碼信")
        }).catch(e => {
            alert(e.message)
        })
    }

    return (
        <div className={"min-h-screen bg-gray-50"}>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={`/logo/${process.env.NEXT_PUBLIC_APP_ID}`}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        登入或建立帳號
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" onSubmit={isForgot ? forgotPassword : emailLogin}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    電子郵件
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                !isForgot && (
                                    <>
                                        <div>
                                            <label htmlFor="password"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                密碼
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )
                            }


                            <div className="flex items-center justify-end">
                                <div className="text-sm leading-6">
                                    <button onClick={e => setIsForgot(!isForgot)}
                                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        {isForgot ? "返回登入/註冊" : "忘記密碼？"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isForgot ? "發送重設密碼驗證信" : "登入/註冊"}
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">或使用社群帳號登入</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button
                                    onClick={e => signIn()}
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </button>

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5 fill-[#24292F]" aria-hidden="true" fill="currentColor"
                                         viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">GitHub</span>
                                </a>

                                <button
                                    onClick={generateQR}
                                    className="flex col-span-2 w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <QrCodeIcon className="h-5 w-5 fill-[#24292F]"/>
                                    <span className="text-sm font-semibold leading-6">QRCode</span>
                                </button>
                                {loadingQr && (
                                    <div
                                        className={"flex col-span-2 w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "}>
                                        <div className={"animate-spin"}>
                                            <ArrowPathIcon className="h-5 w-5"/>
                                        </div>
                                    </div>
                                )}
                                {showQR &&
                                    <div
                                        className={"flex col-span-2 w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "}>
                                        {qrID === "" ?
                                            <div className={"animate-spin"}>
                                                <ArrowPathIcon className="h-5 w-5"/>
                                            </div> :
                                            <div className={"relative p-4 flex flex-col items-center"}>
                                                {
                                                    qrAuth?.status === "scanned" &&
                                                    <div
                                                        className={"absolute top-0 left-0 right-0 bottom-0 bg-gray-50 opacity-90 flex justify-center items-center"}>
                                                        <div>
                                                            <CheckCircleIcon
                                                                className={"h-24 w-24 mx-auto my-auto text-gray-700"}/>
                                                            <span className={"text-lg"}>
                                                            已掃描，請在 App 上點擊確認
                                                        </span>
                                                        </div>
                                                    </div>
                                                }
                                                <QRCode
                                                    size={256}
                                                    style={{height: "auto", maxWidth: "70%", width: "70%"}}
                                                    value={`qrauth://endpoint=${encodeURIComponent(process.env.NEXT_PUBLIC_API_ENDPOINT)}&id=${qrID}`}
                                                    viewBox={`0 0 256 256`}
                                                />
                                                <div className={"text-center text-xl my-2"}>
                                                    打開全方位掃一掃，快速登入
                                                </div>
                                                <div
                                                    className={"flex flex-col text-xs text-gray-400 pt-1 border-t border-gray-400"}>
                                                    <span>ID: {qrAuth?.uuid}</span>
                                                    <span>IP: {qrAuth?.ip}</span>
                                                    <span>UA: {qrAuth?.user_agent}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
