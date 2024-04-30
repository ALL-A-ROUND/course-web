
const footerNavigation = {
    contact: [
        // {name: '課程系統', href: '/course'},
        {name: '電話：0965-168725', href: 'tel:0965-168725'},
        {name: 'Email：ICHcare2017@gmail.com', href: 'mailto:ICHcare2017@gmail.com'},
        {name: 'LINE ID：@home-angel', href: 'mailto:ICHcare2017@gmail.com'},
        // {name: '題目評測', href: '/problem'},
    ],
    support: [
        // {name: '價格方案', href: '#'},
    ],
    company: [
        // {name: '關於我們', href: '#'},
        // {name: '部落格', href: '#'},
        // {name: '徵才說明', href: '#'},
        // {name: '公告', href: '#'},
        // {name: '合作夥伴', href: '#'},
    ],
    legal: [
        {name: '隱私權政策', href: 'https://policy.esgltc.com/privacy'},
        {name: '使用條款', href: 'https://policy.esgltc.com/terms'},
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'LINE ID',
            href: 'https://line.me/R/ti/p/%40home-angel',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg"><title>LINE</title>
                    <path
                        d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
            ),
        },
    ],
}
export default function Footer() {
    return (
        <footer className="bg-gray-50" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24">
                <div className="xl:grid xl:grid-cols-2 xl:gap-8">
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">聯絡方式</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {footerNavigation.contact.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href}
                                               className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">法遵</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {footerNavigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href}
                                               className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*<div className="mt-12 xl:mt-0">*/}
                    {/*    <h3 className="text-base font-medium text-gray-900">Subscribe to our newsletter</h3>*/}
                    {/*    <p className="mt-4 text-base text-gray-500">*/}
                    {/*        The latest news, articles, and resources, sent to your inbox weekly.*/}
                    {/*    </p>*/}
                    {/*    <form className="mt-4 sm:flex sm:max-w-md">*/}
                    {/*        <label htmlFor="email-address" className="sr-only">*/}
                    {/*            Email address*/}
                    {/*        </label>*/}
                    {/*        <input*/}
                    {/*            type="email"*/}
                    {/*            name="email-address"*/}
                    {/*            id="email-address"*/}
                    {/*            autoComplete="email"*/}
                    {/*            required*/}
                    {/*            className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500"*/}
                    {/*            placeholder="Enter your email"*/}
                    {/*        />*/}
                    {/*        <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">*/}
                    {/*            <button*/}
                    {/*                type="submit"*/}
                    {/*                className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"*/}
                    {/*            >*/}
                    {/*                Subscribe*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>
                <div
                    className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
                    <div className="flex space-x-6 md:order-2">
                        {footerNavigation.social.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true"/>
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
                        <span>&copy; {(new Date()).getFullYear()}  中華國際全方位照護學會</span>
                        <span>
                            &nbsp;|&nbsp; 網站擁有＆管理者 <a href="https://esgltc.com" className="text-gray-500 hover:text-gray-900" target={"_blank"}>台灣全方位國際科技有限公司 (93559521, AS18044)</a> 設計
                        </span>
                        <p>
                            <p>營業人稅籍資料：</p>
                            <p>公司統一編號：93559521</p>
                            <p>公司名稱：台灣全方位國際科技有限公司</p>
                            <p>公司地址：804060 高雄市鼓山區博愛二路343號6樓之11</p>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}