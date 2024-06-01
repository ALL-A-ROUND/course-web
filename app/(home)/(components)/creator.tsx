import PersonImage from "@/public/temp/person.avif"
import Image from "next/image"

const creators = [
    {
        id: "sjefi",
        name: "Creator 1",
        job: "創作者",
        image: PersonImage,
        followers: 123,
        intro: "這是一個很棒的創作者",
        why: "因為他的課程很棒"
    },
    {
        id: "sjefi",
        name: "Creator 1",
        job: "創作者",
        image: PersonImage,
        followers: 123,
        intro: "這是一個很棒的創作者",
        why: "因為他的課程很棒"
    },
    {
        id: "sjefi",
        name: "Creator 1",
        job: "創作者",
        image: PersonImage,
        followers: 123,
        intro: "這是一個很棒的創作者",
        why: "因為他的課程很棒"
    },
]

export default function PopularCreators() {
    return (
        <div className="w-full">
            <div className="flex flex-row gap-5 py-8">
                <h2 className="text-3xl">熱門創作者</h2>
                <h2>| 備受喜歡的創作者們</h2>
            </div>
            <div className="flex flex-row gap-5">
                {creators.map(creator => (
                    <div className="h-[30rem] w-60 flex flex-col" key={creator.id}>
                        <div className="relative overflow-hidden rounded-t-xl">
                            <Image src={creator.image} alt={creator.name} />
                            <div className="absolute bg-gradient-to-t from-black/30 to-transparent bottom-0 text-white px-3">
                                <h2 className="font-semibold text-xl">{`${creator.name} | ${creator.job}`}</h2>
                                <h2 className="py-2">{creator.intro}</h2>
                            </div>
                        </div>
                        <div className="rounded-b-xl h-16 bg-slate-100 w-full px-3 py-2 flex flex-row gap-2">
                            <div className="bg-year-100 text-year-400 py-0.5 px-3 w-fit h-fit">課程</div>
                            <div>
                                {creator.why}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}