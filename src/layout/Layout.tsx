/** Components */
import { Divider } from "@mui/material";
import { Footer, Header } from "./components";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles["container"]}>
      <Header />
      <Divider />
      <div className={styles["content"]}>{children}</div>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </div>
  );
};
export default Layout;
