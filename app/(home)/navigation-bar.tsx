import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ShoppingCartComponent from "./(navigation-components)/shopping-cart"
import AccountRelations from "./(navigation-components)/account-relation"
import useTranslation from "next-translate/useTranslation";
const img = require("@/public/logo-ne.png")
export default function NavigationBar() {
    return (
        <nav className="w-full h-14 flex flex-row justify-between px-3 lg:h-16 lg:px-10 border-b shadow">
            <div className="flex flex-row items-center h-full space-x-5 px-5">
                <Link href="/" className="flex flex-row space-x-3 items-center">
                    {/* <span className="sr-only">Your Company</span> */}
                    <Image
                        width={640} height={640}
                        className="h-8 w-auto sm:h-10 rounded-lg"
                        src={img}
                        alt=""
                    />
                    {/* <div>喵課學院</div> */}
                </Link>
                <Search className="size-8 text-gray-600 cursor-pointer p-1.5 hover:bg-year-100 rounded-lg" />
            </div>
            <div className="flex flex-row items-center space-x-5">
                {/*<MyCourse />*/}
                <Link href={"/course"}>
                    <span>我的學習</span>
                </Link>
                <ShoppingCartComponent />
                {/*<NotificationCenter />*/}
                <AccountRelations />
            </div>
        </nav>
    )
}
