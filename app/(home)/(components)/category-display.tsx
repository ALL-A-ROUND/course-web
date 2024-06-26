const categories = [
    {
        title: "職場技能"
    },
    {
        title: "生活品味"
    },
    {
        title: "投資理財"
    },
    {
        title: "語言"
    },
    {
        title: "程式"
    },
    {
        title: "設計"
    },
    {
        title: "行銷"
    },
    {
        title: "手作"
    },
    {
        title: "攝影"
    },
    {
        title: "人文"
    },
    {
        title: "音樂"
    },
    {
        title: "藝術"
    },
]

export default function Categories() {
    return (
        <div className="flex flex-row md:w-full w-screen">
            <div className="bg-year-200 w-12 skew-y-[20deg] -translate-y-2" />
            <div className="bg-year-100 md:h-[25rem] h-[40rem] w-full flex md:flex-row flex-col">
                <div className="w-80 py-10 text-3xl px-5 space-y-3">
                    <h2>從興趣到專業</h2>
                    <h2>12大領域盡情探索</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 w-full h-full py-5 px-5 gap-5 overflow-y-auto">
                    {categories.map((category) => (
                        <div className="bg-white rounded-md shadow-lg flex flex-row h-24">
                            <div className="flex flex-col w-2/5 text-center justify-center items-center">
                                {category.title.length > 2 ?
                                    <div>
                                        <h2>{category.title.slice(0, 2)}</h2>
                                        <h2>{category.title.slice(2)}</h2>
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
