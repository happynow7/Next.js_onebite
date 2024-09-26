"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string>("");

    const q = searchParams.get("q") ?? "";

    useEffect(() => {
        setSearch(q);
    }, [q]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (!search.trim() || search === q) return;
        router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                value={search}
                placeholder="검색어를 입력해주세요"
            />
            <button onClick={handleSearchSubmit}>검색</button>
        </div>
    );
}
