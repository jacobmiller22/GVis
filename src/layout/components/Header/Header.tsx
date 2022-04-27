/** Components */
import { Toolbar, Typography } from "@mui/material";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Toolbar>
      <div>
        <Typography>
          <span className={styles["accent"]}>G</span>Vis
        </Typography>
      </div>
    </Toolbar>
  );
};

export default Header;
