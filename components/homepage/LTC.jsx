import Link from "next/link";
import {ComputerDesktopIcon} from "@heroicons/react/24/solid";
import '@/app/globals.css'
import useSWR from "swr";
import {api} from "@/app/utils";

const posts = [
    {
        id: 1,
        title: '點選右方圖片連結洽詢',
        href: 'https://lin.ee/MG3qHnr',
        description: '歡迎各單位洽詢團報優惠、\n' +
            '\n' +
            '單位年度內訓課程規劃\n' +
            '\n' +
            '點選右方圖片連結洽詢',
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_a77e7ca9aadc4d418bc04d1ce3b0b29a~mv2.jpg/v1/crop/x_0,y_14,w_308,h_444/fill/w_379,h_546,al_c,lg_1,q_80,enc_auto/10251.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 2,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/7LxDDCXGLtnY8vBm6',
        description: `下班後的好去處～～
堅持運動！！永保青春！！
循環課程指導，隨時加入立即展開運動~
專業教練 + 個人化處方箋 = 健康體態！
報名優惠並贈送健身用品中～～
高雄首家社區智能環狀運動中心
循環課程，隨時可加入！
上課地址：高雄市前金區中華三路30號( 中央公園內)`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_d122cd0cc1f146fb8c0e911bd3ab553d~mv2.png/v1/crop/x_10,y_0,w_470,h_770/fill/w_356,h_583,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%88%AA%E5%9C%96%202023-05-27%20%E4%B8%8B%E5%8D%883_24_45.png',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 3,
        title: '點選右方圖片連結洽詢',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLScQ0t1VjJiOSLXYEG-1-RnBD-oItv6gzZCuEQwmE9LZQd3DPw/viewform?usp=sf_link',
        description: `前金區新班開課融入「芳療與運動」的結合，請大家多協助轉發！`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_1ab2e8fcd5e94e2e961b500f7e9e4b7a~mv2.jpg/v1/crop/x_10,y_0,w_1030,h_1573/fill/w_373,h_570,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/420384.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 4,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/n4xqFBh16gD7YG5u8',
        description: `楠梓區新班開課融入「芳療與運動」的結合，請大家多協助轉發！`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_55faa3671c6f44b2aa5b73cd50bfa2ad~mv2.jpg/v1/crop/x_10,y_0,w_1028,h_1580/fill/w_371,h_570,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%E4%B8%96%E8%A9%A0.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 5,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/ES6qM4hrHKBvQ5LN6',
        description: `《立志全方位健身俱樂部》
響應高雄健康年•全民一起來健身

慶祝立志中學長照科開始招生~
由照顧服務人員健康出發
持「照顧服務人員」證明者~新班免費！`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_89c9dcdf6a65432c85e7e9205a39a4ae~mv2.jpg/v1/crop/x_10,y_0,w_823,h_1383/fill/w_356,h_598,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/%E7%AB%8B%E5%BF%97%E9%8A%80%E9%AB%AE.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 6,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/VDhU7WUm4fPUqYGJ8',
        description: `旗津區新班開課~請大家多協助轉發！`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_926ea29b15b045edb50d3373c1c8d794~mv2.jpg/v1/crop/x_10,y_0,w_832,h_1392/fill/w_356,h_596,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/S__305455142.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
   /* {
        id: 7,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/ovdSpAFuoNjZSVSa7',
        description: `3/23 (六)

下午13點30分~15點35分

文化照顧策略(I)-”個案”分析與討論

1、上課教室：高雄市三民區立志街36號（立志中學）

2、進入課程群組後，請先「閱讀記事本」


長照專業品質積分:多元族群文化3.6點

注意：此課程研習證明申請截止日3/23。超過此日再申請或繳費，將不受理，3/24起繳納之費用將不退回，直接列入您對學會的捐贈，謝謝`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_bc87d7cb03244d988e065ee94784e73e~mv2.jpg/v1/crop/x_11,y_0,w_834,h_1312/fill/w_368,h_579,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/323.jpg',
        date: null,/!*'Mar 16, 2020',*!/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/!*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*!/
    },*/
    {
        id: 2,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/7LxDDCXGLtnY8vBm6',
        description: `下班後的好去處～～
堅持運動！！永保青春！！
循環課程指導，隨時加入立即展開運動~
專業教練 + 個人化處方箋 = 健康體態！
報名優惠並贈送健身用品中～～
高雄首家社區智能環狀運動中心
循環課程，隨時可加入！
上課地址：高雄市前金區中華三路30號( 中央公園內)`,
        imageUrl: 'https://static.wixstatic.com/media/4a36e2_d122cd0cc1f146fb8c0e911bd3ab553d~mv2.png/v1/crop/x_10,y_0,w_470,h_770/fill/w_356,h_583,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E6%88%AA%E5%9C%96%202023-05-27%20%E4%B8%8B%E5%8D%883_24_45.png',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    {
        id: 9,
        title: '點選右方圖片連結洽詢',
        href: 'https://forms.gle/FSztrnk7sCpgoUdh6',
        description: `
台北學員有福囉～～
邀您免費來體驗智能運動
讓科技幫助運動更安全有效

《花博全方位智能健身俱樂部》
5/25（六）新班招生

預防肌少～全民動起來！

慰勞第一線醫療照護人員
免費運動享健康！
先愛好自己，才能照顧更多人！`,
        imageUrl: '/huabo.jpg',
        date: null,/*'Mar 16, 2020',*/
        datetime: null,// '2020-03-16',
        category: null, //{title: 'Marketing', href: '#'},
        author: null/*{
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },*/
    },
    // More posts...
]

export default function Page() {
    const {
        data: courses,
        isLoading
    } = useSWR(`/course/recommend`, async (url) => await api("GET", `/course/recommend`, null).then(d => d))

    return (
        <>
            <div className="bg-white py-12 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">中華國際全方位照護學會</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            堅持運動！！永保青春！！
                        </p>
                    </div>
                    <div
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <a href={post.href} target="_blank" key={post.id}>
                                <article className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            src={post.imageUrl}
                                            alt=""
                                            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                                            {post.date && (
                                                <time dateTime={post.datetime} className="text-gray-500">
                                                    {post.date}
                                                </time>
                                            )}
                                            {post.category && (
                                                <a
                                                    href={post.category.href}
                                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                >
                                                    {post.category.title}
                                                </a>
                                            )}
                                        </div>
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                <span className="absolute inset-0"/>
                                                {post.title}
                                            </h3>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                        </div>
                                        {post.author && (
                                            <div className="relative mt-8 flex items-center gap-x-4">
                                                <img src={post.author.imageUrl} alt=""
                                                     className="h-10 w-10 rounded-full bg-gray-100"/>
                                                <div className="text-sm leading-6">
                                                    <p className="font-semibold text-gray-900">
                                                        <a href={post.author.href}>
                                                            <span className="absolute inset-0"/>
                                                            {post.author.name}
                                                        </a>
                                                    </p>
                                                    <p className="text-gray-600">{post.author.role}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-12 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">精選課程</h2>
                    </div>
                    <div
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {isLoading && (
                            <div>Loading...</div>
                        )}
                        {courses?.map((course) => (
                            <a href={`/course/${course.id}`} target="_blank" key={course.id}>
                                <article className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            src={course?.image ? process.env.NEXT_PUBLIC_ASSET_ENDPOINT + course?.image : "/course.jpeg"}
                                            alt=""
                                            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                                            {/*{post.date && (*/}
                                            {/*    <time dateTime={post.datetime} className="text-gray-500">*/}
                                            {/*        {post.date}*/}
                                            {/*    </time>*/}
                                            {/*)}*/}
                                            {/*{post.category && (*/}
                                            {/*    <a*/}
                                            {/*        href={post.category.href}*/}
                                            {/*        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"*/}
                                            {/*    >*/}
                                            {/*        {post.category.title}*/}
                                            {/*    </a>*/}
                                            {/*)}*/}
                                        </div>
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                <span className="absolute inset-0"/>
                                                {course.name} {course.price > 0 ? `NT$${course.price}` : "免費"}
                                            </h3>
                                            <span className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">

                                            </span>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{course.description}</p>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        ))}
                    </div>
                </div>
            </div>


            {/* Stats section */}
            {/*<div className="relative bg-gray-900">*/}
            {/*    <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">*/}
            {/*        <div className="h-full w-full xl:grid xl:grid-cols-2">*/}
            {/*            <div className="h-full xl:relative xl:col-start-2">*/}
            {/*                <img*/}
            {/*                    className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"*/}
            {/*                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"*/}
            {/*                    alt="People working on laptops"*/}
            {/*                />*/}
            {/*                <div*/}
            {/*                    aria-hidden="true"*/}
            {/*                    className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">*/}
            {/*        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">*/}
            {/*            <h2 className="text-base font-semibold">*/}
            {/*    <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">*/}
            {/*      超越業界，評測專案*/}
            {/*    </span>*/}
            {/*            </h2>*/}
            {/*            <p className="mt-3 text-3xl font-bold tracking-tight text-white">*/}
            {/*                專案開發教學更簡單*/}
            {/*            </p>*/}
            {/*            <p className="mt-5 text-lg text-gray-300">*/}
            {/*                WaKuOJ 獨創評測專案技術，協助教師快速建立評測專案，並且提供多種評測方式，讓教師可以輕鬆建立評測專案。*/}
            {/*            </p>*/}
            {/*            <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">*/}
            {/*                {metrics.map((item) => (*/}
            {/*                    <p key={item.id}>*/}
            {/*                        <span className="block text-2xl font-bold text-white">{item.stat}</span>*/}
            {/*                        <span className="mt-1 block text-base text-gray-300">*/}
            {/*          <span className="font-medium text-white">{item.emphasis}</span> {item.rest}*/}
            {/*        </span>*/}
            {/*                    </p>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Pricing/>*/}
            {/*<About/>*/}
            {/* CTA Section */}
            {/*<div className="bg-white">*/}
            {/*    <div*/}
            {/*        className="mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">*/}
            {/*        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">*/}
            {/*            <span className="block">Ready to get started?</span>*/}
            {/*            <span*/}
            {/*                className="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent">*/}
            {/*    Get in touch or create an account.*/}
            {/*  </span>*/}
            {/*        </h2>*/}
            {/*        <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">*/}
            {/*            <a*/}
            {/*                href="pages#"*/}
            {/*                className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"*/}
            {/*            >*/}
            {/*                Learn more*/}
            {/*            </a>*/}
            {/*            <a*/}
            {/*                href="pages#"*/}
            {/*                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100"*/}
            {/*            >*/}
            {/*                Get started*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
