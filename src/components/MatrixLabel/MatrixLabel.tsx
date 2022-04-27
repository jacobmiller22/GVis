import clsx from "clsx";

/** Components */
import { IconButton, TableCell } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./MatrixLabel.module.css";

type MatrixLabelProps = {
  value: string;
  onDelete?: (e: any) => void;
  active?: boolean;
};

const MatrixLabel = ({ value, onDelete, active }: MatrixLabelProps) => {
  return (
    <TableCell
      className={clsx(styles["header-cell"], active ? styles["active"] : {})}
    >
      {value}
      <IconButton onClick={onDelete} size="small" edge="start">
        <RemoveIcon />
      </IconButton>
    </TableCell>
  );
};

export default MatrixLabel;
