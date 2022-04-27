import { useState, useEffect } from "react";
import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import { bfs } from "lib/algo";

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
    <div>
      <h3>BFS</h3>
      <div>
        <AdjacencyMatrix
          initialLabels={bfsLabels}
          initialMatrix={bfsData}
          onDirectedChange={setIsDirected}
          onDataChange={onDataChange}
          onLabelChange={onLabelChange}
          active={active}
          highlighted={highlighted}
        />
      </div>

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
