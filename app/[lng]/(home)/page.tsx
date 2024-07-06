import CarouselPage from "./(components)/carousel"
import Categories from "./(components)/category-display"
import GuessYouWant from "./(components)/guess-you-want"
import Cooperation from "./(components)/cooperation"
import AllCourse from "@/app/[lng]/(home)/(components)/all-course";
import {redirect} from "next/navigation";

export default function HomePage({
    params: {lng}
                                 }) {
    return (`/${lng}/home`)
}
