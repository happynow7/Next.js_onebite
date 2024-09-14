import { ReactNode } from "react";

export default function Home() {
  return <h2>영화 상세 페이지</h2>
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};