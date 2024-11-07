import dynamic from "next/dynamic";

export default async function HomePage({
                                           params: {lng}
                                       }) {
    const HomePageComponent = dynamic(() => import(`./(app_base)/${process.env.NEXT_PUBLIC_APP_ID}`));

    return (
        <HomePageComponent params={{
            lng
        }}/>
    )

}
