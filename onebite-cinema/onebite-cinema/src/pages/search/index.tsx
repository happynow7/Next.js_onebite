import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movie";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search.module.css";
import Head from 'next/head';

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
        <>
            <Head>
                <title>한입시네마 - 검색결과</title>
                <meta
                    property='og:image'
                    content='/thumbnail.png'
                />
                <meta
                    property='og:title'
                    content='한입 씨네마 - 검색결과'
                />
                <meta
                    property='og:description'
                    content='한입 씨네마에 등록된 영화들을 만나보세요~!'
                />
            </Head>
        <div className={style.container}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
        </>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};