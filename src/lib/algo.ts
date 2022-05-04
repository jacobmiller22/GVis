import { SymmetricMatrix, Edge, Matrix, AdjacencyList, Node } from "./matrix";

export function* bfs(
  list: AdjacencyList,
  root: Node,
  directed: boolean = false
) {
  const visited: Set<Node> = new Set<Node>();

  let queue: Node[] = [root];
  visited.add(root);
  let front: Node | undefined = queue.shift();
  while (front !== undefined) {
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
    front = queue.shift();
  }
}

/**
 * From the root node, use depth-first search to find all edges that will be in the spanning tree.
 * @param mat 2D matrix
 * @param root the root node of format [i, j]
 * @param directed Whether or not the matrix is directed
 */
export function* dfs(
  list: AdjacencyList,
  root: Node,
  directed: boolean = false
) {
  // debugger;
  let stack: Node[] = [root];
  const visited = new Set<Node>();

  while (stack.length > 0) {
    // Check if we have already visited this node
    const front: Node = stack.pop() as Node;

    if (visited.has(front)) {
      continue;
    }

    visited.add(front);

    for (let i = list.n - 1; i >= 0; i--) {
      if (
        list.data[front][i] != null &&
        list.data[front][i] !== -1 &&
        !visited.has(i) &&
        (stack[stack.length - 1] || front) !== i
      ) {
        const msg = `Include edge ${stack[stack.length - 1] || front} ${
          !directed ? "<" : ""
        }-> ${i}`;

        yield {
          msg,
          edges: directed
            ? [[stack[stack.length - 1] || front, i]]
            : [
                [stack[stack.length - 1] || front, i],
                [i, stack[stack.length - 1] || front],
              ],
        };

        stack.push(i);
        visited.add(i);
      }
    }
  }
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
