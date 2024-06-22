import demoImage from "@/public/temp/course-view.avif"
import Image from "next/image"

const posts = [
    {
        id: "lfjie",
        produced_by: "Haha Channel",
        title: "Title 1",
        date: new Date(),
        image: demoImage,
        content: "This is a content",
        tag: ["tag1", "tag2"],
        view: 2982,
    },
    {
        id: "lfjie",
        produced_by: "Haha Channel",
        title: "Title 1",
        date: new Date(),
        image: demoImage,
        content: "This is a content",
        tag: ["tag1", "tag2"],
        view: 2982,
    },
    {
        id: "lfjie",
        produced_by: "Haha Channel",
        title: "Title 1",
        date: new Date(),
        image: demoImage,
        content: "This is a content",
        tag: ["tag1", "tag2"],
        view: 2982,
    },
    {
        id: "lfjie",
        produced_by: "Haha Channel",
        title: "Title 1",
        date: new Date(),
        image: demoImage,
        content: "This is a content",
        tag: ["tag1", "tag2"],
        view: 2982,
    },
]

export default function Post() {
    return (
        <div className="md:h-[32rem] h-[60rem] md:w-full w-screen px-5 md:px-0">
            <div className="flex flex-row gap-5 items-center">
                <h2 className="text-3xl">精選文章</h2>
                <h2>| 每周充電時間</h2>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
                {posts.map(post => (
                    <div key={post.id} className="flex flex-col relative border-b h-52 w-full">
                        <div className="flex flex-row gap-8">
                            <div>{post.produced_by}</div>
                            <div>{`${post.date.getFullYear()}/${post.date.getMonth() + 1}/${post.date.getDate()}`}</div>
                            <div>{post.view}</div>
                        </div>
                        <div className="w-72 flex flex-col space-y-3">
                            <h3 className="font-semibold h-12">{post.title}</h3>
                            <h4 className="text-gray-400 h-20">{post.content}</h4>
                        </div>
                        <div className="flex flex-row gap-5">
                            {post.tag.map(tag => (<div key={tag} className="bg-gray-200 rounded-lg px-5 py-0.5 flex flex-row gap-2 items-center"><p className="text-year-300 text-lg font-bold">#</p>{tag}</div>))}
                        </div>
                        <div className="absolute w-40 h-16 right-5 top-1/2 -translate-y-2/3">
                            <Image
                                src={post.image}
                                alt={post.title}
                                className=""
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}