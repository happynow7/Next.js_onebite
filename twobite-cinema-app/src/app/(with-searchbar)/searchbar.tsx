"use client";
import {useState} from "react";

export default function Searchbar(){
    const [search, setSearch] = useState("")
    const oonChangeSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }
    return (
        <div>
            <input/>
            <button>검색</button>
        </div>
    )
}