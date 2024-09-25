import {
    GetServerSidePropsContext, GetStaticPropsContext,
    InferGetServerSidePropsType, InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import fetchDetailMovie from "@/lib/fetch-detail-movie";
import {getStaticProps} from "@/pages";

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

    if (router.isFallback) return "Loading";
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
    );
}