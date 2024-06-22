
import CarouselPage from "./(components)/carousel"
import Categories from "./(components)/category-display"
import Cooperation from "./(components)/cooperation"

export default function HomePage() {
    return (
        <div className="py-3 pb-20">
            <div className="relative">
                <CarouselPage />
            </div>

            <div className="px-2">
                <h2 className="py-2 text-xl">積分課程 第一大類</h2>

                <div className="h-40 bg-red-100">

                </div>
            </div>

            <div className="px-2">
                <h2 className="py-2 text-xl">積分課程 第二大類</h2>

                <div className="h-72 bg-amber-200">

                </div>
            </div>

            <div className="px-2 pb-12">
                <h2 className="py-2 text-xl">政府積分課相關公告須知</h2>

                <div className="h-72 bg-amber-300">

                </div>
            </div>

            <Categories />
            <Cooperation />
        </div >
    )
}