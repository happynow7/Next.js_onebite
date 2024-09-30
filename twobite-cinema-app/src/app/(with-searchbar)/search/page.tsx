import MovieItem from "../../../components/movie-item";
import style from "./page.module.css";
import {MovieData} from "@/types";
import {delay} from "@/util/delay";

export default async function Page({searchParams}:{searchParams: {q?:string}}) {

  await delay(1000);

  const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
      {
        cache: "force-cache"
      }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
