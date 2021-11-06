export type Coords = {
  x: number,
  y: number,
}

export type Cell = Coords & {
  value: any,
}

export type Cells = Cell[][]
export type Grid = Cells

export type Actor = Cell & {
  mx: number;
  my: number;
  isActive: boolean,
}
