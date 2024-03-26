import Nav from "@/app/(home)/Nav";
import dynamic from 'next/dynamic';

export default function HomeLayout({ children }) {
    const FooterComponent = dynamic(() => import(`@/components/homepage-footer/${process.env.NEXT_PUBLIC_APP_ID}`), {
        ssr: false,
    });
    return (
        <div className="bg-white">
            <header>
                <Nav/>
            </header>
            <main>
                {children}
            </main>

            <FooterComponent/>
        </div>
    )
}
