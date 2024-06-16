import CarouselPage from "./(components)/carousel"
import Categories from "./(components)/category-display"
import GuessYouWant from "./(components)/guess-you-want"
import Cooperation from "./(components)/cooperation"
import AllCourse from "@/app/(home)/(components)/all-course";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <CarouselPage/>
            <div className="xl:px-20 px-0 max-w-7xl flex flex-col items-center space-y-8">
                {/*<Founding/>*/}
                <GuessYouWant/>
                <AllCourse/>
                <Categories/>
                {/*<Highlight/>*/}
                {/*<RecentHotCourse/>*/}
                {/*<Post/>*/}
                {/*<Creators/>*/}
                <Cooperation/>
            </div>
        </div>
    )
}
// export default function Home() {
//     // const HomePageComponent = dynamic(() => import(`@/components/homepage/${process.env.NEXT_PUBLIC_APP_ID}`), {
//     //     ssr: false,
//     // });

//     return <HomePageComponent/>;
// }
