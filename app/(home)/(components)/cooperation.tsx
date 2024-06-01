import Image from "next/image"
import Company from "@/public/temp/company.avif"

const companies = [
    {
        id: "jseif",
        name: "Company 1",
        image: Company,
    },
    {
        id: "jsei3f",
        name: "Company 1",
        image: Company,
    },
    {
        id: "jsei2f",
        name: "Company 1",
        image: Company,
    },
]

export default function Cooperation() {
    return (
        <div className="h-80 w-full">
            <div className="flex flex-row gap-5 items-center">
                <h2 className="text-3xl">合作單位</h2>
                <h2 className="text-gray-600">| 優良合作夥伴</h2>
            </div>
            <div className="flex flex-row gap-5">

                <div className="flex flex-row py-8 gap-5 w-[52rem]">
                    {companies.map(company => (
                        <div key={company.id} className="w-60 h-32 border relative rounded-lg border-gray-500 flex items-center justify-center">
                            <div className="relative w-32 h-28">
                                <Image src={company.image.src}
                                    alt={company.name}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-slate-100 w-72 h-52 flex flex-col items-center px-3 gap-3">
                    <div className="h-16">
                    </div>
                    <div className="text-xl">
                        加入喵課學院創作者的行列
                    </div>
                    <div>
                        知識付費，讓你的知識變現
                    </div>
                    <div className="bg-year-200 hover:bg-year-300 cursor-pointer text-white w-full text-center py-2 rounded-lg">
                        我要開課
                    </div>
                </div>
            </div>
        </div>
    )
}