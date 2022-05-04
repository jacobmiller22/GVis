/** Components */
import { Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Toolbar className={styles["toolbar"]}>
      <div className={styles["content"]}>
        <Link href="/">
          <Typography className={styles["brand"]}>
            <span className={styles["accent"]}>G</span>Vis
          </Typography>
        </Link>
      </div>
    </Toolbar>
  );
};

export default Header;
