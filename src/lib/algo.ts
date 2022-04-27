import { dir } from "console";
import { SymmetricMatrix, Edge, Matrix } from "./matrix";

export function* bfs(
  mat: SymmetricMatrix,
  root: Edge,
  directed: boolean = false
) {
  const visited = new Set<string>();
  const queue = [root];
  visited.add(JSON.stringify(root));

  let front = undefined;
  while ((front = queue.shift())) {
    const [i, j] = front;

    for (let [i2, j2] of adjacentEdges(mat, i, j)) {
      if (visited.has(JSON.stringify([i2, j2]))) {
        // Ignore if already visited
        continue;
      }
      // Add nodes to the queue
      visited.add(JSON.stringify([i2, j2]));
      if (!directed) {
        visited.add(JSON.stringify([j2, i2]));
      }
      queue.push([i2, j2]);

      const msg = directed
        ? `Include edge ${i2} -> ${j2}`
        : `Include edge ${i2} <-> ${j2}`;
      yield {
        msg,
        edges: directed
          ? [[i2, j2]]
          : [
              [i2, j2],
              [j2, i2],
            ],
      };
    }
  }
}

function adjacentEdges(mat: SymmetricMatrix, i: number, j: number) {
  // GET edges to adjacent node at i, j
  let edges = [];
  for (let i2 = 0; i2 < mat.n; i2++) {
    if (i2 === i) {
      continue;
    }
    if (mat.data[i]?.[i2] !== null) {
      edges.push([i, i2]);
    }
    if (mat.data[i2]?.[i] !== null) {
      edges.push([i2, i]);
    }
  }
  return edges;
}
