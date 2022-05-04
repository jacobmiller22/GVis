import { SymmetricMatrix, Edge, Matrix, AdjacencyList, Node } from "./matrix";

// export function* bfs(
//   mat: SymmetricMatrix,
//   root: Edge,
//   directed: boolean = false
// ) {
//   const visited = new Set<string>();
//   const queue = [root];
//   visited.add(JSON.stringify(root));

//   let front = undefined;
//   while () {
//     const [i, j] = front;

//     for (let [i2, j2] of adjacentEdges(mat, i, j)) {
//       if (visited.has(JSON.stringify([i2, j2]))) {
//         // Ignore if already visited
//         continue;
//       }
//       // Add nodes to the queue
//       visited.add(JSON.stringify([i2, j2]));
//       if (!directed) {
//         visited.add(JSON.stringify([j2, i2]));
//       }
//       queue.push([i2, j2]);

//       const msg = directed
//         ? `Include edge ${i2} -> ${j2}`
//         : `Include edge ${i2} <-> ${j2}`;
//       yield {
//         msg,
//         edges: directed
//           ? [[i2, j2]]
//           : [
//               [i2, j2],
//               [j2, i2],
//             ],
//       };
//     }
//   }
// }

export function* bfs(
  list: AdjacencyList,
  root: Node,
  directed: boolean = false
) {
  const visited: Set<Node> = new Set<Node>();

  let queue: Node[] = [root];
  visited.add(root);
  let front: Node | undefined;
  while ((front = queue.shift()) !== undefined) {
    for (let i = 0; i < list.n; i++) {
      if (
        list.data[front][i] != null &&
        list.data[front][i] !== -1 &&
        !visited.has(i)
      ) {
        visited.add(i);
        queue.push(i);

        const msg = `Include edge ${front} ${!directed ? "<" : ""}-> ${i}`;

        yield {
          msg,
          edges: directed
            ? [[front, i]]
            : [
                [front, i],
                [i, front],
              ],
        };
      }
    }
    // front = queue.shift();
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
/**
 * From the root node, use depth-first search to find all edges that will be in the spanning tree.
 * @param mat 2D matrix
 * @param root the root node of format [i, j]
 * @param directed Whether or not the matrix is directed
 */
export function* dfs(
  mat: SymmetricMatrix,
  root: Edge,
  // visited: Set<string>,
  directed: boolean = false
) {
  const stack = [root];
  const visited = new Set<string>();
  console.clear();
  let front = undefined;
  while ((front = stack.pop())) {
    const [i, j] = front;

    // Check if we have already visited this node

    if (wasVisited(visited, mat, i, j)) {
      continue;
    }

    // Mark as visited
    visited.add(JSON.stringify([i, j]));
    if (!directed) {
      visited.add(JSON.stringify([j, i]));
    }

    const msg = directed
      ? `Include edge ${i} -> ${j}`
      : `Include edge ${i} <-> ${j}`;
    yield {
      msg,
      edges: directed
        ? [[i, j]]
        : [
            [i, j],
            [j, i],
          ],
    };

    console.log(
      `Adjected edges to ${i}, ${j}`,
      JSON.stringify(adjacentEdges(mat, i, j))
    );
    //@ts-ignore
    stack.push(...adjacentEdges(mat, i, j));

    console.log("stack", JSON.stringify(stack));
  }
}

function wasVisited(
  visited: Set<string>,
  mat: SymmetricMatrix,
  i: number,
  j: number
) {
  //Check out of bounds,
  if (i < 0 || i >= mat.n || j < 0 || j >= mat.n) {
    return true;
  }
  // if (i === j) {
  //   return true;
  // }

  // Check if we have already visited this node
  const key = JSON.stringify([i, j]);
  return visited.has(key);
}

// Adjacency matrix to adjacency list
export function adjacencyMat2List(mat: SymmetricMatrix): AdjacencyList {
  // array of size n
  const list: number[][] = new Array(mat.n);
  for (let i: number = 0; i < mat.n; i++) {
    list[i] = [];
    for (let j = 0; j < mat.n; j++) {
      if (mat.data[i][j] !== null && i !== j) {
        list[i].push(j);
      } else {
        list[i].push(-1);
      }
    }
  }
  return { n: mat.n, data: list };
}
