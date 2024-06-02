import Image, { StaticImageData } from 'next/image'
import demoImage from '@/public/temp/course-view.avif'

const courses = [
    {
        id: 'jfise',
        image: demoImage,
        title: 'Title 1',
        produced_by: "Haha Channel",
        percentage: 1282,
        price: 1000,
        original_price: 2000,
        foundingCourse: true,
    },
    {
        id: 'jfise',
        image: demoImage,
        title: 'Title 1',
        produced_by: "Haha Channel",
        percentage: 1282,
        price: 1000,
        original_price: 2000,
        foundingCourse: true,
    },
    {
        id: 'jfise',
        image: demoImage,
        title: 'Title 1',
        produced_by: "Haha Channel",
        percentage: 1282,
        price: 1000,
        original_price: 2000,
        foundingCourse: true,
    },
    {
        id: 'jfise',
        image: demoImage,
        title: 'Title 1',
        produced_by: "Haha Channel",
        percentage: 1282,
        price: 1000,
        original_price: 2000,
        foundingCourse: true,
    },
    {
        id: 'jfise',
        image: demoImage,
        title: 'Title 1',
        produced_by: "Haha Channel",
        percentage: 1282,
        price: 1000,
        original_price: 2000,
        foundingCourse: true,
    },
]

export default function RecentHotCourse() {
    return (
        <div className="md:w-full w-screen flex flex-row">
            <div className="bg-year-500 md:h-[40rem] h-[60rem] w-[calc(100%-5rem)]">
                <div className='flex flex-row gap-3 items-center py-8 px-5 '>
                    <h1 className='text-white text-4xl'>近期熱門課程</h1>
                    <p className='text-white'>| 這是最新熱門課程的描述</p>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 px-8'>
                    <div className='flex flex-col gap-3'>
                        {courses.slice(0, 3).map((course) => (
                            <FoundingCard
                                key={course.id}
                                image={course.image}
                                title={course.title}
                                produced_by={course.produced_by}
                                percentage={course.percentage}
                                price={course.price}
                                original_price={course.original_price}
                            />
                        ))}
                    </div>
                    <div className='flex flex-col gap-3 justify-center'>
                        {courses.slice(3).map((course) => (
                            <FoundingCard
                                key={course.id}
                                image={course.image}
                                title={course.title}
                                produced_by={course.produced_by}
                                percentage={course.percentage}
                                price={course.price}
                                original_price={course.original_price}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-20 bg-year-400 skew-y-[-20deg] -translate-y-[0.9rem]" />
        </div>
    )
}

const FoundingCard = ({
    image,
    title,
    produced_by,
    percentage,
    price,
    original_price,
}: {
    image: StaticImageData | string,
    title: string,
    produced_by: string,
    percentage: number,
    price: number,
    original_price: number,
}) => {
    return (
        <div className='flex flex-row text-white'>
            <div className='w-1/2 relative overflow-hidden'>
                <Image src={image}
                    alt={title}
                    className='object-cover hover:scale-110 transition ease-in-out rounded-md w-full'
                />
            </div>
            <div className="py-3 px-3">
                <div className="flex flex-row gap-3">
                    <p className="text-lg">{title}</p>
                </div>
                <h2 className="py-1 text-gray-200">{`By ${produced_by}`}</h2>
                <div className="py-2">
                    <div className="flex flex-row justify-between">
                        <p className="text-year-100">募資倒數</p>
                        <p className="text-gray-100">{`${percentage}%`}</p>
                    </div>
                    <div className="h-1 bg-year-300 rounded-full" style={{
                        width: `${Math.min(percentage, 100)}%`
                    }} />
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <h2 className="text-xl ">{`NT$${price}`}</h2>
                    <h2 className="line-through text-gray-200">{`NT$${original_price}`}</h2>
                </div>
            </div>
        </div>
    )
}