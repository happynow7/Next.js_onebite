import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ReactNode} from "react";


export default function App({Component, pageProps }: AppProps & {Component:NextPageWithLayout}) {
    type NextPageWithLayout = NextPage &{
        getLayout?:(page: ReactNode) =>ReactNode;
    }
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return(
    <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  )
}
