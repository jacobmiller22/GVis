import { useState, useEffect } from "react";
import { useLocalStorage } from "hooks";
import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import { bfs } from "lib/algo";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import styles from "./BFSView.module.css";
import useLocalStorageState from "use-local-storage-state";

const BFSView = () => {
  const [savedData, setSavedData] = useLocalStorage("bfsData", INIT_BFS_DATA);
  const [savedLabels, setSavedLabels] = useLocalStorage(
    "bfsLabels",
    INIT_BFS_LABELS
  );
  // const [savedData, setSavedData] = useLocalStorageState("bfsData", {
  //   ssr: true,
  //   defaultValue: INIT_BFS_DATA,
  // });
  console.log("Saved data", savedData);
  // const [savedLabels, setSavedLabels] = useLocalStorageState("bfsLabels", {
  //   ssr: true,
  //   defaultValue: INIT_BFS_LABELS,
  // });
  const [bfsData, setBfsData] = useState<SymmetricMatrix>(savedData);
  const [bfsLabels, setBfsLabels] = useState<string[]>(savedLabels);
  const [bfsGenerator, setBfsGenerator] = useState<any>(null);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [active, setActive] = useState<[number, number][]>([]);
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);
  const [root, setRoot] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    // Update the BFS Generator function with the new matrix.
    setBfsGenerator(bfs(bfsData, root, isDirected));
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

  const onRootChange = (root: [number, number]) => {
    setRoot(root);
  };

  const onIteration = (steps: { msg: string; edges: [number, number][] }[]) => {
    setActive([...steps[steps.length - 1].edges]);
    let h: [number, number][] = steps.flatMap((step) => step.edges);
    h.pop();
    setHighlighted([...h]);
  };

  const resetData = () => {
    setBfsData(INIT_BFS_DATA);
    setBfsLabels(INIT_BFS_LABELS);
    window?.location.reload();
  };
  console.log("bfsLabels", bfsLabels);
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
        onRootChange={onRootChange}
      />

      <SimulationControls
        generator={bfsGenerator}
        labels={bfsLabels}
        onIteration={onIteration}
      />
      <div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={resetData}>Reset Data</Button>
      </div>
    </div>
  );
};

export default BFSView;

const INIT_BFS_DATA = arr2mat([0, 48, 39, 0, 32, 0], 3);
const INIT_BFS_LABELS = ["A", "B", "C"];
