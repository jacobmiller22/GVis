import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import styles from "./styles.module.css";
import { useState } from "react";
import BFSView from "views/BFSView";

const IndexView = () => {
  // const [useLocal, setUseLocal] = useState(false);

  return (
    <div>
      <div></div>
      <section>
        <BFSView />
      </section>
      {/* <section></section> */}
    </div>
  );
};

export default IndexView;
