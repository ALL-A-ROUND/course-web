import CarouselPage from "./(components)/carousel"
import Categories from "./(components)/category-display"
import Founding from "./(components)/founding"
import GuessYouWant from "./(components)/guess-you-want"
import Highlight from "./(components)/highlight"
import LiveStream from "./(components)/live-stream"
import RecentHotCourse from "./(components)/recent-hot-courses"
import Post from "./(components)/post"
import Creators from "./(components)/creator"
import Cooperation from "./(components)/cooperation"
import useSWR from "swr";
import {api} from "@/app/utils";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <CarouselPage/>
            <div className="xl:px-20 px-0 max-w-7xl flex flex-col items-center space-y-8">
                <Founding/>
                <GuessYouWant/>
                <Categories/>
                <Highlight/>
                <RecentHotCourse/>
                <Post/>
                <Creators/>
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
