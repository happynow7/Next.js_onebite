import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movie";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search.module.css";
import {InferGetServerSidePropsType, GetServerSidePropsContext} from "next";


export default function Page() {
    const router = useRouter();
    const {q} = router.query;
    const [movies, setMovies] = useState<MovieData[]>([]);


    useEffect(() => {
        const fetchSearchResult = async () => {
            const data = await fetchMovies(q as string);
            setMovies(data);
        };
        if (q) fetchSearchResult();
    },[q]);

    return (
        <div className={style.container}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};