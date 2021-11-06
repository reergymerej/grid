import * as types from './types';

// WARNING: mutates grid
export const setCellIfPresent = (grid: types.Grid, x: number, y: number, value: string): types.Grid => {
  const cell = gridReference(grid, x, y)
  if (cell) {
    if (cell.value) {
      // allowing multiple
      cell.value = `${cell.value} ${value}`
    } else {
      cell.value = value
    }
  }
  return grid
}

// WARNING: mutates grid
export const setCellIfPresentByCell = (grid: types.Grid, newCell: types.Cell): types.Grid => {
  return setCellIfPresent(grid, newCell.x, newCell.y, newCell.value)
}

// returns reference to grid cell if present
export const gridReference = (grid: types.Grid, x: number, y: number): types.Cell | undefined => {
  const row = grid[y]
  if (row) {
    const cell = row[x]
    return cell
  }
}
