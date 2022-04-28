import Link from "next/link";
import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import styles from "./styles.module.css";
import { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const IndexView = () => {
  // const [useLocal, setUseLocal] = useState(false);

  return (
    <div>
      <section>
        <Typography variant="h6">Visualizers</Typography>
        <List>
          <Link href="/bfs" passHref>
            <ListItem divider>
              <ListItemText>Breadth First Search</ListItemText>
            </ListItem>
          </Link>
          <Link href="/dfs" passHref>
            <ListItem divider>
              <ListItemText>Depth First Search</ListItemText>
            </ListItem>
          </Link>
        </List>
      </section>
      <section>
        <Typography variant="h6">About</Typography>
      </section>
    </div>
  );
};

export default IndexView;
