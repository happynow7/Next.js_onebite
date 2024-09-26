import styles from "./page.module.css";
import ClientComponent from "@/app/components/client-component";
import ServerComponent from "@/app/components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
        <ClientComponent>
            <ServerComponent/>
        </ClientComponent>
    </div>
  );
}
