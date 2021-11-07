const rotate90 = (grid: any[][]): any[][] => {
  const rows = grid.length
  const columns = grid[0].length
  const result: any[][] = []

  for (let x = 0; x < columns; x++) {
    const row = []
    for (let y = rows - 1; y >= 0; y--) {
      row.push(grid[y][x])
    }
    result.push(row)
  }
  return result
}

const rotate180 = (grid: any[][]): any[][] => {
  const rows = grid.length
  const columns = grid[0].length
  const result: any[][] = []

  for (let y = rows - 1; y >= 0; y--) {
    const row = []
    for (let x = columns - 1; x >= 0; x--) {
      row.push(grid[y][x])
    }
    result.push(row)
  }
  return result
}

const rotate270 = (grid: any[][]): any[][] => {
  const rows = grid.length
  const columns = grid[0].length
  const result: any[][] = []

  for (let x = columns - 1; x >= 0; x--) {
    const row = []
    for (let y = 0; y < rows; y++) {
      row.push(grid[y][x])
    }
    result.push(row)
  }
  return result
}

export const rotate = (grid: any[][], degrees: number): any[][] => {
  switch (degrees) {
    case 90:
      return rotate90(grid)
    case 180:
      return rotate180(grid)
    case 270:
      return rotate270(grid)
    default:
      throw new Error(`unhandled degrees "${degrees}"`)
  }
  return []
}

export const flip = (grid: any[][]): any[][] => {
  const rows = grid.length
  const columns = grid[0].length
  const result: any[][] = []
  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = columns - 1; x >= 0; x--) {
      row.push(grid[y][x])
    }
    result.push(row)
  }
  return result
}
