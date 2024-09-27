import Searchbar from "@/components/searchbar";
import { ReactNode, Suspense } from "react";

export default function Layout({children}: {
  children: ReactNode;
}) {
  return (
      <div>
        <Suspense fallback={<>Loading Movies...</>}>
          <Searchbar />
        </Suspense>
        {children}
      </div>
  );
}