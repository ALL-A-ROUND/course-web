import Nav from "@/app/[lng]/Nav";
import {api} from "@/app/[lng]/utils";
import md5 from "md5";
import {StarIcon} from "@heroicons/react/24/outline";

async function RankList() {
    const topThree = await api('GET', '/rank/top-three', {}).then(res => res)

    return (
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">積分排行榜</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-400">
                        勇者無懼 強者無敵
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                        每天簽到就可以領積分；寫題目也有積分唷！
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
                >
                    {topThree.map((person) => (
                        <li key={person.name} className="rounded-2xl bg-gray-800 px-8 py-10">
                            <img className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
                                 src={"https://www.gravatar.com/avatar/" + md5(person.email) + "?s=200"}
                                 alt=""/>
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{person.name}</h3>
                            <p className="text-sm leading-6 text-gray-400 inline-flex items-center gap-1">
                                {person.point} <StarIcon className={"w-4 h-4"}/>
                            </p>
                            <ul role="list" className="mt-6 flex justify-center gap-x-6">
                                <li>
                                    <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-300">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-300">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default function Rank() {
    return (
        <>
            <Nav/>
            <RankList/>
        </>
    )
}
