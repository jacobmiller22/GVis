import { useState, useEffect } from "react";
import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import { bfs } from "lib/algo";
import { Typography } from "@mui/material";
import styles from "./BFSView.module.css";

const BFSView = () => {
  const [bfsData, setBfsData] = useState<SymmetricMatrix>(INIT_BFS_DATA);
  const [bfsLabels, setBfsLabels] = useState<string[]>(INIT_BFS_LABELS);
  const [bfsGenerator, setBfsGenerator] = useState<any>(null);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [active, setActive] = useState<[number, number][]>([]);
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);

  useEffect(() => {
    // Update the BFS Generator function with the new matrix.
    setBfsGenerator(bfs(bfsData, [0, 0], isDirected));
  }, [bfsData, isDirected]);

  const onDataChange = (mat: SymmetricMatrix) => {
    const newMatrix = { n: mat.n, data: [...mat.data] };
    setBfsData(newMatrix);
  };

  const onLabelChange = (newLabels: string[]) => {
    // const newMatrix = { n: l, data: [...bfsData.data] };
    setBfsLabels(newLabels);
  };

  const onIteration = (steps: { msg: string; edges: [number, number][] }[]) => {
    setActive([...steps[steps.length - 1].edges]);
    let h: [number, number][] = steps.flatMap((step) => step.edges);
    h.pop();
    setHighlighted([...h]);
  };

  return (
    <div className={styles["container"]}>
      <Typography variant="h5">Breadth First Search</Typography>
      <Typography variant="body1">
        This algorithm is used to find a spanning tree of a graph. It prefers
        breadth over depth as the name suggests. The graph and its resulting
        spanning tree will be represented by the below adjacency matrix.
      </Typography>
      <AdjacencyMatrix
        initialLabels={bfsLabels}
        initialMatrix={bfsData}
        onDirectedChange={setIsDirected}
        onDataChange={onDataChange}
        onLabelChange={onLabelChange}
        active={active}
        highlighted={highlighted}
      />

      <SimulationControls
        generator={bfsGenerator}
        labels={bfsLabels}
        onIteration={onIteration}
      />
    </div>
  );
};

export default BFSView;

const INIT_BFS_DATA = arr2mat([0, 48, 39, 0, 32, 0], 3);
const INIT_BFS_LABELS = ["A", "B", "C"];
