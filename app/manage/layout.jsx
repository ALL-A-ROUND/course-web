// import Nav from "@/app/(home)/Nav";
import dynamic from 'next/dynamic';
import NavigationBar from "@/app/(home)/navigation-bar";


export default function HomeLayout({ children }) {
    const FooterComponent = dynamic(() => import(`@/components/homepage-footer/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });
    return (
        <div className="bg-white">
            <NavigationBar />
            <main>
                {children}
            </main>

            <FooterComponent />
        </div>
    )
}
