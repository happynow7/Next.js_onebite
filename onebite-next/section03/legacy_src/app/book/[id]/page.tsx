import ClientComponent from "@/app/components/client-component";

export default function Page({params}:{params:{id: string | string[]}}) {
    return (
        <div>
            Book/[id] 페이지 {params.id}
            <ClientComponent>
                <></>
            </ClientComponent>
        </div>
    )
}