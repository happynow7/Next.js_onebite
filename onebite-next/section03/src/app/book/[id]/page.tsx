export default function Page({params}:{params:{id: string | string[]}}) {
    return <div>Book/[id] 페이지 {params.id}</div>;
}
