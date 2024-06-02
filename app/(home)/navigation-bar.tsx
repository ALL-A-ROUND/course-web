import { Bell, Menu, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ShoppingCartComponent from "./(navigation-components)/shopping-cart"
import MyCourse from "./(navigation-components)/my-course"
import NotificationCenter from "./(navigation-components)/notification-center"
import AccountRelations from "./(navigation-components)/account-relation"

export default function NavigationBar() {
    return (
        <nav className="w-full h-14 flex flex-row justify-between px-3 lg:h-16 lg:px-10">
            <div className="flex flex-row items-center h-full space-x-5 px-5">
                <Link href="/" className="flex flex-row space-x-3 items-center">
                    {/* <span className="sr-only">Your Company</span> */}
                    <Image
                        width={640} height={640}
                        className="h-8 w-auto sm:h-10 rounded-lg"
                        src={`/logo/lcvs.png`}
                        alt=""
                    />
                    {/* <div>喵課學院</div> */}
                </Link>
                <Search className="size-8 text-gray-600 cursor-pointer p-1.5 hover:bg-year-100 rounded-lg" />
            </div>
            <div className="flex flex-row items-center space-x-5">
                <MyCourse />
                <ShoppingCartComponent />
                <NotificationCenter />
                <AccountRelations />
            </div>
        </nav>
    )
}