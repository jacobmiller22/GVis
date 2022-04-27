/** Components */
import { Divider } from "@mui/material";
import { Footer, Header } from "./components";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Divider />
      <div className="content">{children}</div>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </div>
  );
};
export default Layout;
