import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";

async function AllMovies() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
        cache: "force-cache",
    });
    if (!response.ok) {
        return <div>오류가 발생했습니다.</div>;
    }

    const allMovies: MovieData[] = await response.json();
    return allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
    ));
}

async function RecoMovies() {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
        {
            next: { revalidate: 10 },
        }
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다.</div>;
    }

    const recoMovies: MovieData[] = await response.json();
    return recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
    ));
}

export const metadata : Metadata={
    title: "두입 씨네마",
    description : "두입 씨네마에 등록된 영화를 만나보세요~!",
    openGraph:{
        title:"두입 씨네마",
        description: "두입 씨네마에 등록된 영화를 만나보세요~!",
        images: ["/thumbnail.png"],
    }
}

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <div className={style.reco_container}>
                    <Suspense fallback={<MovieListSkeleton count={3} />}>
                        <RecoMovies />
                    </Suspense>
                </div>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <div className={style.all_container}>
                    <Suspense fallback={<MovieListSkeleton count={30} />}>
                        <AllMovies />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}