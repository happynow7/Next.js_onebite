import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search.module.css";
import movies from "@/mock/dummy.json";

export default function Page() {
    const router = useRouter();
    const [filteredMovies, setFilteredMovies] = useState(movies);

    useEffect(() => {
        const q = router.query.q as string;
        if (q) {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(q.toLowerCase())
            );
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies);
        }
    }, [router.query.q]);

    return (
        <div className={style.container}>
            {filteredMovies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};