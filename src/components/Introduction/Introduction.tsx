import { Typography, Divider } from "@mui/material";
import BackButton from "components/BackButton";
import styles from "./Introduction.module.css";

type IntroductionProps = { body: string; title: string };

const Introduction = ({ title, body }: IntroductionProps) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["title-container"]}>
        <Typography variant="h5">{title}</Typography>
        <BackButton asLink href="/" variant="text" />
      </div>
      <Divider />
      <Typography variant="body1">{body}</Typography>
    </div>
  );
};

export default Introduction;
