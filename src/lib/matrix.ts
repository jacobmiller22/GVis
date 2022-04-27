import _ from "lodash";

export type MatrixData = (number | null)[][];

export type Matrix = {
  data: MatrixData;
  m: number; // number of rows
  n: number; // number of columns
};

export type SymmetricMatrix = {
  n: number; // number of rows and columns
  data: MatrixData;
};

export type Edge = [number, number];

export const arr2mat = (arr: (number | null)[], n: number): SymmetricMatrix => {
  // arr should have length 0.5 * m * n
  if (arr.length !== Math.ceil((n * (n + 1)) / 2)) {
    throw new Error("arr2mat: arr length should be n(n+1)/2");
  }

  let data: (number | null | undefined)[][] = _.times(n, () =>
    _.times(n, () => undefined)
  );

  // turn flat upper triangular matrix into adjacency matrix
  // n(n+1)/2 elements
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let index = i * n + j - (i * (i + 1)) / 2;
      data[i][j] = arr[index];
      data[j][i] = arr[index];
    }
  }

  return { n, data: data as (number | null)[][] };
};

export const enforceSymmetry = (
  mat: SymmetricMatrix,
  i: number,
  j: number,
  newValue: number | null
): SymmetricMatrix => {
  mat.data[i][j] = newValue;
  mat.data[j][i] = newValue;

  return mat;
};

export enum MatrixDir {
  COLUMN = "column",
  ROW = "row",
}
