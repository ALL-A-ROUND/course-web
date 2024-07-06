import BulletinBoard from "@/app/[lng]/(logged_in_users)/(in_class)/course//[course_id]/bulletin/BulletinBoard";

export default function AddBulletin({ params }) {
    return (
        <BulletinBoard course_id={params.course_id} post_id={params.post_id}/>
    )
}
