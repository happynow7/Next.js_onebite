import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { Suspense } from "react";

async function AllMovies() {
    await delay(1000);

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
    await delay(3000);

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