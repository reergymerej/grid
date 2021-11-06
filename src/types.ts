export type Coords = {
  x: number,
  y: number,
}

export type Cell = Coords & {
  value: any,
}

export type Cells = Cell[][]
export type Grid = Cells

export enum Orientation {
  north,
  east,
  south,
  west,
}

export type Actor = Cell & {
  mx: number;
  my: number;
  isActive: boolean,
  orientation: Orientation,
}

type CellMapValue = 0 | 1 | 2
export type CellMap = CellMapValue[][]
