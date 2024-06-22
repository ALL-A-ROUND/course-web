
import CarouselPage from "@/app/(home)/(components)/carousel"

export default function HomePage() {
    return (
        <div className="px-2 py-3 pb-20">
            <div className="relative">
                <CarouselPage />
            </div>

            <div>
                <h2 className="py-2 text-xl">積分課程 第一大類</h2>

                <div className="h-40 bg-red-100">

                </div>
            </div>
            <div>
                <h2 className="py-2 text-xl">積分課程 第二大類</h2>

                <div className="h-72 bg-amber-200">

                </div>
            </div>
            <div>
                <h2 className="py-2 text-xl">政府積分課相關公告須知</h2>
            </div>
        </div>
    )
}