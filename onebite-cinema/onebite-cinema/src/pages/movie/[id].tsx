import {
    GetServerSidePropsContext, GetStaticPropsContext,
    InferGetServerSidePropsType, InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import fetchDetailMovie from "@/lib/fetch-detail-movie";
import fetchMovies from "@/lib/fetch-movie";
import Head from 'next/head';

export const getStaticPaths = async() => {
    const movies = await fetchMovies();

    const paths = movies.map((movie: { id: number }) => ({
        params: { id: movie.id.toString() }, // id는 문자열이어야 합니다.
    }));

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (
    context: GetStaticPropsContext
) => {
    const id = context.params!.id;
    const movie = await fetchDetailMovie(Number(id));

    if (!movie) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            movie,
        },
    };
};

export default function Page({movie}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>한입 씨네마</title>
                    <meta
                        property='og:image'
                        content='/thumbnail.png'
                    />
                    <meta
                        property='og:title'
                        content='한입 씨네마'
                    />
                    <meta
                        property='og:description'
                        content='한입 씨네마에 등록된 영화들을 만나보세요~!'
                    />
                </Head>
                <div>로딩중입니다...</div>
            </>
        );
    }
    if (!movie) return "Loading Failed..";

    const {
        id,
        title,
        subTitle,
        company,
        runtime,
        description,
        posterImgUrl,
        releaseDate,
        genres,
    } = movie;

    return (
        <>
        <Head>
            <title>{movie.title}</title>
            <meta
                property='og:image'
                content={movie.posterImgUrl}
            />
            <meta
                property='og:title'
                content={movie.title}
            />
            <meta
                property='og:description'
                content={movie.description}
            />
        </Head>
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${posterImgUrl}')` }}
            >
                <img src={posterImgUrl} />
            </div>

            <div className={style.info_container}>
                <div>
                    <h2>{title}</h2>
                    <div>
                        {releaseDate} / {genres.join(", ")} / {runtime}분
                    </div>
                    <div className={style.gray}>{company}</div>
                </div>

                <div>
                    <div className={style.subTitle}>{subTitle}</div>
                    <div className={style.description}>{description}</div>
                </div>
            </div>
        </div>
        </>
    );
}