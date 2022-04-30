import Link from "next/link";
import { AdjacencyMatrix, SimulationControls } from "components";
import { arr2mat, SymmetricMatrix } from "lib/matrix";
import styles from "./IndexView.module.css";
import { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const IndexView = () => {
  // const [useLocal, setUseLocal] = useState(false);

  return (
    <div>
      <section>
        <Typography variant="h6">Visualizers</Typography>
        <List>
          {algorithms.map(({ href, label }, i: number) => (
            <Link href={href} passHref key={`algorithm-${i}`}>
              <ListItem divider className={styles["link"]}>
                <ListItemText className={styles["link"]}>{label}</ListItemText>
                <ChevronRightIcon className={styles["link-sibling"]} />
              </ListItem>
            </Link>
          ))}
        </List>
      </section>
      <section>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" gutterBottom>
          {about}
        </Typography>
        <Typography variant="body1">
          Feel free to check the code at on{" "}
          <Link href="https://github.com/jacobmiller22/GVis">
            <a target="_blank">Github</a>
          </Link>
          .
        </Typography>
      </section>
    </div>
  );
};

export default IndexView;

const about = `
This simple web app is a visualizer for several important graph theory algorithms. It was made as a project for 
the Virginia Tech Applied Combinatorics MATH3134 course taught by Dr. Clemons. Built by Jacob Miller.
`;

const algorithms: { href: string; label: string }[] = [
  { href: "/bfs", label: "Breadth-First Search" },
  { href: "/dfs", label: "Depth-First Search" },
];
