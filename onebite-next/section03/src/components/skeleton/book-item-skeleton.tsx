import style from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
    return (
        <div className={style.container}>
            <div className={style.cover_img}></div>
            <div className={style.info_container}>
                <div className={style.title}></div>
                <div className={style.subtitle}></div>
                <br />
                <div className={style.author}></div>
            </div>
        </div>
    );
}

// react-loading-skeleton 설치해서 사용하면 애니메이션도 적용 가능