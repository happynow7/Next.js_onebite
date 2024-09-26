export default function Page({ params }:{params:{id: string | string[]}}) {
    return <div>Movie : {params.id}</div>;
}