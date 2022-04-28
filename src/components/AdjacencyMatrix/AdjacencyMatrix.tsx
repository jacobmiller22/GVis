import React, { useState, useEffect, useRef } from "react";
import {
  enforceSymmetry,
  MatrixData,
  MatrixDir,
  SymmetricMatrix,
} from "lib/matrix";
import clsx from "clsx";

/** Components */
import MatrixLabel from "components/MatrixLabel";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./AdjacencyMatrix.module.css";

type AdjacencyMatrixProps = {
  initialLabels: string[];
  initialMatrix: SymmetricMatrix;
  onDirectedChange: (isDirected: boolean) => void;
  onDataChange?: (...any: any[]) => void;
  onLabelChange?: (...any: any[]) => void;
  onRootChange?: (root: [number, number]) => void;
  active?: [number, number][];
  highlighted?: [number, number][];
};

const AdjacencyMatrix = ({
  initialLabels,
  initialMatrix,
  onDirectedChange,
  onDataChange,
  onLabelChange,
  onRootChange,
  active,
  highlighted,
}: AdjacencyMatrixProps) => {
  // Verify that the labels and data are the same length.

  const [labels, setLabels] = useState<string[]>(initialLabels);
  const [data, setData] = useState<SymmetricMatrix>(initialMatrix);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [newNode, setNewNode] = useState<string>("");
  const [root, setRoot] = useState<number>(0);
  const newNodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onDataChange && onDataChange(data);
  }, [data]);

  useEffect(() => {
    onLabelChange && onLabelChange(labels);
  }, [labels]);

  useEffect(() => {
    onDirectedChange && onDirectedChange(isDirected);
  }, [isDirected]);

  useEffect(() => {
    onRootChange && onRootChange([root, root]);
  }, [root]);

  if (!labels) return null;

  if (labels.length < data.n) {
    throw new Error("Length of labels must be greater or equal to data.");
  }

  const handleChange = (i: number, j: number, value: string) => {
    let mat: SymmetricMatrix = { data: [...data.data], n: data.n };
    if (!isDirected) {
      mat = enforceSymmetry(mat, i, j, value !== "" ? parseInt(value) : null);
    } else {
      mat.data[i][j] = value !== "" ? parseInt(value) : null;
    }
    setData({ n: mat.n, data: [...mat.data] });
  };

  const handleLabelAdd = () => {
    if (newNode === "") return;
    setLabels([...labels, newNode]); // Add the label to the labels array.
    setNewNode(""); // Reset the new label.

    let matData: MatrixData = [...data.data];
    for (let row of matData) {
      // Add a new column to the data array.
      row.push(null);
    }
    matData.push(new Array(data.n + 1).fill(null)); // Add a new row to the data array.
    matData[matData.length - 1][matData[0].length - 1] = 0; // Set the last element to 0 (The weight of a node should be 0 by default).
    setData({ n: data.n + 1, data: matData });

    newNodeRef.current?.focus();
  };

  const handleLabelDelete = (i: number, dir: MatrixDir) => {
    // Delete the corresponding data row/column before changing the labels.
    let matData: MatrixData = [...data.data];
    matData = matData.filter((_, j) => j !== i);
    for (let row of matData) {
      row.splice(i, 1);
    }

    setData({ n: data.n - 1, data: matData });

    // Delete the label.
    const newLabels = labels.filter((_, j) => j !== i);
    setLabels(newLabels);
  };

  const clearData = () => {
    setLabels([]);
    setData({ n: 0, data: [] });
  };

  const renderHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {labels.map((label, i) => {
            return (
              <MatrixLabel
                value={label}
                active={Boolean(active?.find(([a, b]) => a === i))}
                key={`th-${i}`}
                onDelete={() => handleLabelDelete(i, MatrixDir.COLUMN)}
              />
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const renderDataWithHeadings = (data: MatrixData) => {
    return labels.map((label, i) => {
      return (
        <TableRow key={`tr-${i}`}>
          <MatrixLabel
            value={label}
            active={Boolean(active?.find(([a, _]) => a === i))}
            onDelete={() => handleLabelDelete(i, MatrixDir.ROW)}
          />
          {labels?.map((_, j) => {
            return (
              <TableCell
                key={`td-${i}-${j}`}
                className={clsx(
                  styles["data-cell"],
                  Boolean(active?.find(([a, b]) => a === i && b === j))
                    ? styles["active"]
                    : {},
                  Boolean(highlighted?.find(([a, b]) => a === i && b === j))
                    ? styles["highlighted"]
                    : {}
                )}
              >
                <input
                  type="number"
                  role="input"
                  value={data?.[i]?.[j] ?? ""}
                  onChange={(e) => handleChange(i, j, e.target.value)}
                />
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <div className={styles["container"]}>
      <Paper variant="outlined" className={styles["table-paper"]}>
        <Toolbar className={styles["table-toolbar"]}>
          <FormGroup className={styles["start-node-container"]}>
            <FormControl>
              <InputLabel>Root Node</InputLabel>
              <Select
                value={root}
                onChange={(e: any) => setRoot(e.target.value)}
                label="Root Node"
              >
                {labels.map((label, i) => (
                  <MenuItem value={i} key={`menu-item-${i}`}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup className={styles["directed-container"]}>
            <FormControlLabel
              label="Directed?"
              control={
                <Checkbox
                  checked={isDirected}
                  onChange={() => setIsDirected(!isDirected)}
                />
              }
            />
          </FormGroup>
          <div className={styles["new-node-container"]}>
            <TextField
              name="newNode"
              variant="outlined"
              label="New Node"
              size="small"
              type="text"
              value={newNode}
              onChange={(e) => setNewNode(e.target.value)}
              inputRef={newNodeRef}
            />
            <Button
              variant="contained"
              onClick={handleLabelAdd}
              endIcon={<AddIcon />}
            >
              Add
            </Button>
          </div>
          <div>
            <Button color="primary" variant="outlined" onClick={clearData}>
              Clear
            </Button>
          </div>
        </Toolbar>
        <div className={styles["table-container"]}>
          <Table
            className={styles["table"]}
            sx={{ "& > *": { width: "auto !important" } }}
          >
            {renderHead()}
            <TableBody>{renderDataWithHeadings(data.data)}</TableBody>
          </Table>
        </div>
      </Paper>
      <div></div>
    </div>
  );
};

export default AdjacencyMatrix;
