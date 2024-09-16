import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movie";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search.module.css";
import movies from "@/mock/dummy.json";
import {GetServerSidePropsContext} from "next";
import {InferGetServerSidePropsType} from "next";


export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const q = context.query.q;
    const movies = await fetchMovies(q as string);

    return {
        props: {
            movies,
        },
    };
};

export default function Page({movies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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