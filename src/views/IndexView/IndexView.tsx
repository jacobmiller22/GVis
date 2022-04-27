import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import styles from "./styles.module.css";
import { useState } from "react";
import BFSView from "views/BFSView";

const IndexView = () => {
  // const [useLocal, setUseLocal] = useState(false);

  return (
    <div id="root">
      <div></div>
      <section>
        <BFSView />
      </section>
      <section>
        <h3>DFS</h3>
        <div>
          {/* <AdjacencyMatrix
            initialLabels={["A", "B", "C"]}
            data={arr2mat([90, 48, 39, 3, 32, 5], 3)}
            // onDataChange={onDataChange}
          /> */}
        </div>
      </section>
    </div>
  );
};

export default IndexView;
