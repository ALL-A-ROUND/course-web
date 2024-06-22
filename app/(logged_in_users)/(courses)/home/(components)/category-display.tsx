const categories = [
    {
        title: "國文"
    },
    {
        title: "英文"
    },
    {
        title: "自然 - 生物"
    },
    {
        title: "自然 - 地科"
    },
    {
        title: "社會 - 歷史"
    },
    {
        title: "社會 - 地理"
    },
    {
        title: "社會 - 公民"
    },
]

export default function Categories() {
    return (
        <div className="flex flex-row md:w-full w-screen">
            <div className="bg-year-200 w-12 skew-y-[20deg] -translate-y-2" />
            <div className="bg-year-100 md:h-[25rem] h-[40rem] w-full flex md:flex-row flex-col">
                <div className="w-80 py-10 text-3xl px-5 space-y-3">
                    <h2>還不知從何處下手嗎</h2>
                    <h2>從國中課程開始複習</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 w-full h-full py-5 px-5 gap-5 overflow-y-auto">
                    {categories.map((category) => (
                        <div className="bg-white rounded-md shadow-lg flex flex-row h-24" key={category.title}>
                            <div className="flex flex-col text-center justify-center items-center w-full h-full">
                                {category.title.length > 2 ?
                                    <div className="">
                                        {/* <h2>{category.title.slice(0, 2)}</h2> */}
                                        {/* <h2>{category.title.slice(2)}</h2> */}
                                        {category.title}
                                    </div> :
                                    <h2>{category.title}</h2>}
                            </div>
                            <div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
