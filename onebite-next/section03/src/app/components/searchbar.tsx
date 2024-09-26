"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Searchbar(){
    const router = useRouter();
    const [search, setSearch] = useState("");
    const oonChangeSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }

    const onSubmit = ()=>{
        router.push(`/search?q=${search}`)
    }

return (
    <div>
        <input value = {search} onChange={oonChangeSearch}/>
        <button onClick={onSubmit}>검색</button>
    </div>
    )
}