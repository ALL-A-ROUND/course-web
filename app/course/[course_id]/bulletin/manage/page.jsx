import BulletinBoard from "@/app/course/[course_id]/bulletin/BulletinBoard";

export default function AddBulletin({ params }) {
    return (
        <BulletinBoard course_id={params.course_id} post_id={"new"}/>
    )
}