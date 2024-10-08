import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {MovieData} from "@/types";

async  function Footer(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {cache: "force-cache"})

  if(!response.ok){
    return <footer>제작 @winterlood @happynow7</footer>
  }
  const movies: MovieData[] = await response.json();
  const movieCount = movies.length;

  return<footer>
    <div className={style.footer}>제작 @winterlood @happynow7</div>
    <div className={style.footer}>총 {movieCount}개의 영화가 등록되어 있습니다.</div>
  </footer>

}

export default function RootLayout({children, modal}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <div className={style.container}>
        <header>
          <Link href={"/"}>TWOBITE CINEMA</Link>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
      {modal}
      <div id="modal-root"></div>
      </body>
      </html>
  );
}