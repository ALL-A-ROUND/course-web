import Nav from "@/app/Nav";

export default function Example({children}) {
    return (
        <>
            <div className="min-h-screen">
                <Nav/>
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-lg font-semibold leading-6 text-gray-900">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                    </div>
                </header>

                <main className={"min-h-screen bg-gray-50"}>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
