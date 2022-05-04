import { useState, useEffect } from "react";
import { AdjacencyMatrix, Introduction, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import { adjacencyMat2List, bfs } from "lib/algo";
import { Typography } from "@mui/material";
import styles from "./BFSView.module.css";
import useLocalStorageState from "use-local-storage-state";

const BFSView = () => {
  const [savedData, setSavedData] = useLocalStorageState("bfsData", {
    ssr: false,
    defaultValue: { ...INIT_BFS_DATA },
  });
  const [savedLabels, setSavedLabels] = useLocalStorageState("bfsLabels", {
    ssr: false,
    defaultValue: [...INIT_BFS_LABELS],
  });

  const [bfsData, setBfsData] = useState<SymmetricMatrix>(savedData);
  const [bfsLabels, setBfsLabels] = useState<string[]>(savedLabels);
  const [bfsGenerator, setBfsGenerator] = useState<any>(null);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [active, setActive] = useState<[number, number][]>([]);
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);
  const [root, setRoot] = useState<number>(0);

  useEffect(() => {
    // Update the BFS Generator function with the new matrix.
    setBfsGenerator(bfs(adjacencyMat2List(bfsData), root, isDirected));
    setSavedData(bfsData);
    setSavedLabels(bfsLabels);
    setActive([]);
    setHighlighted([]);
  }, [bfsData, isDirected, bfsLabels, root]);

  const onDataChange = (mat: SymmetricMatrix) => {
    const newMatrix = { n: mat.n, data: [...mat.data] };
    setBfsData(newMatrix);
  };

  const onLabelChange = (newLabels: string[]) => {
    // const newMatrix = { n: l, data: [...bfsData.data] };
    setBfsLabels(newLabels);
  };

  const onRootChange = (root: number) => {
    setRoot(root);
  };

  const onIteration = (steps: { msg: string; edges: [number, number][] }[]) => {
    setActive([...steps[steps.length - 1].edges]);
    let h: [number, number][] = steps.flatMap((step) => step.edges);
    h.pop();
    setHighlighted([...h]);
  };

  return (
    <div className={styles["container"]}>
      <Introduction title="Breadth-First Search" body={introBody} />
      <br />
      <AdjacencyMatrix
        initialLabels={bfsLabels}
        initialMatrix={bfsData}
        onDirectedChange={setIsDirected}
        onDataChange={onDataChange}
        onLabelChange={onLabelChange}
        active={active}
        highlighted={highlighted}
        onRootChange={onRootChange}
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

const introBody = `This algorithm is used to find a spanning tree of a graph. It prefers
breadth over depth as the name suggests. The graph and its resulting
spanning tree will be represented by the below adjacency matrix.`;
