import clsx from "clsx";
import styles from "./MatrixLabel.module.css";

type MatrixLabelProps = {
  value: string;
  onDelete?: (e: any) => void;
  active?: boolean;
};

const MatrixLabel = ({ value, onDelete, active }: MatrixLabelProps) => {
  return (
    <th className={clsx(styles["header-cell"], active ? styles["active"] : {})}>
      {value}
      <button onClick={onDelete}>-</button>
    </th>
  );
};

export default MatrixLabel;
