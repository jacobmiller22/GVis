import { useState, useEffect, useRef } from "react";
import {
  enforceSymmetry,
  MatrixData,
  MatrixDir,
  SymmetricMatrix,
} from "lib/matrix";
import clsx from "clsx";

/** Components */
import MatrixLabel from "components/MatrixLabel";
import styles from "./AdjacencyMatrix.module.css";

type AdjacencyMatrixProps = {
  initialLabels: string[];
  initialMatrix: SymmetricMatrix;
  onDirectedChange: (isDirected: boolean) => void;
  onDataChange?: (...any: any[]) => void;
  onLabelChange?: (...any: any[]) => void;
  active?: [number, number][];
  highlighted?: [number, number][];
};

const AdjacencyMatrix = ({
  initialLabels,
  initialMatrix,
  onDirectedChange,
  onDataChange,
  onLabelChange,
  active,
  highlighted,
}: AdjacencyMatrixProps) => {
  // Verify that the labels and data are the same length.

  const [labels, setLabels] = useState<string[]>(initialLabels);
  const [data, setData] = useState<SymmetricMatrix>(initialMatrix);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [newNode, setNewNode] = useState<string>("");
  const newNodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // console.log("Data has changed", data);
    onDataChange && onDataChange(data);
  }, [data]);

  useEffect(() => {
    // console.log("Labels have changed", labels);
    onLabelChange && onLabelChange(labels);
  }, [labels]);

  useEffect(() => {
    onDirectedChange && onDirectedChange(isDirected);
  }, [isDirected]);

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

  const renderHead = () => {
    return (
      <thead>
        <tr>
          <th></th>
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
        </tr>
      </thead>
    );
  };

  const renderDataWithHeadings = (data: MatrixData) => {
    return labels.map((label, i) => {
      return (
        <tr key={`tr-${i}`}>
          <MatrixLabel
            value={label}
            active={Boolean(active?.find(([a, _]) => a === i))}
            onDelete={() => handleLabelDelete(i, MatrixDir.ROW)}
          />
          {labels?.map((_, j) => {
            return (
              <td
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
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        {renderHead()}
        <tbody>{renderDataWithHeadings(data.data)}</tbody>
      </table>
      <div className={styles["options-container"]}>
        <div className={styles["new-node-container"]}>
          <input
            name="newNode"
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
            ref={newNodeRef}
          />
          <button onClick={handleLabelAdd}>Add Node</button>
        </div>
        <div className={styles["directed-container"]}>
          <label>
            <input
              type="checkbox"
              checked={isDirected}
              onChange={() => setIsDirected(!isDirected)}
            />
            Directed?
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdjacencyMatrix;
