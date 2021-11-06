import * as types from './types';

// returns reference to grid cell if present
const gridReference = (grid: types.Grid, x: number, y: number): types.Cell | undefined => {
  const row = grid[y]
  if (row) {
    const cell = row[x]
    return cell
  }
}

// WARNING: mutates grid
const setCellIfPresent = (grid: types.Grid, x: number, y: number, value: string): types.Grid => {
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
const setCellIfPresentByCell = (grid: types.Grid, newCell: types.Cell): types.Grid => {
  return setCellIfPresent(grid, newCell.x, newCell.y, newCell.value)
}

const getActorCollisionBottom = (actor: types.Actor): types.Cell[] => {
  return [
    {
      value: 'collision',
      x: actor.x,
      y: actor.y + 3,
    },
    {
      value: 'collision',
      x: actor.x + 1,
      y: actor.y + 3,
    },
  ]
}

const getActorCollisionLeft = (actor: types.Actor): types.Cell[] => {
  return [
    {
      value: 'collision',
      x: actor.x - 1,
      y: actor.y,
    },
    {
      value: 'collision',
      x: actor.x - 1,
      y: actor.y + 1,
    },
    {
      value: 'collision',
      x: actor.x - 1,
      y: actor.y + 2,
    },
  ]
}

const getActorCollisionRight = (actor: types.Actor): types.Cell[] => {
  return [
    {
      value: 'collision',
      x: actor.x + 1,
      y: actor.y,
    },
    {
      value: 'collision',
      x: actor.x + 1,
      y: actor.y + 1,
    },
    {
      value: 'collision',
      x: actor.x + 2,
      y: actor.y + 2,
    },
  ]
}

// WARNING: mutates grid
export const setCellsForActor = (grid: types.Grid, actor: types.Actor): types.Grid => {
  grid = setCellIfPresent(grid, actor.x, actor.y, actor.value)
  grid = setCellIfPresent(grid, actor.x, actor.y + 1, actor.value)

  grid = setCellIfPresent(grid, actor.x, actor.y + 2, actor.value)
  grid = setCellIfPresent(grid, actor.x + 1, actor.y + 2, actor.value)

  if (actor.isActive) {
    const collisionBottom = getActorCollisionBottom(actor)
    collisionBottom.forEach((cell) => {
      grid = setCellIfPresentByCell(grid, cell)
    })

    const collisionLeft = getActorCollisionLeft(actor)
    collisionLeft.forEach((cell) => {
      grid = setCellIfPresentByCell(grid, cell)
    })

    const collisionRight = getActorCollisionRight(actor)
    collisionRight.forEach((cell) => {
      grid = setCellIfPresentByCell(grid, cell)
    })
  }
  return grid
}

const cellIsAvailable = (cell: types.Cell): boolean => {
  return cell.value === undefined
    || cell.value === 'collision'
}

const canMoveIntoCollisionArea = (grid: types.Grid, collisionArea: types.Cell[]): boolean => {
  let insideBoundary = true
  let noCollisions = true
  for (let i = 0; i < collisionArea.length; i++) {
    const cell = collisionArea[i]
    const gridCell = gridReference(grid, cell.x, cell.y)
    insideBoundary = insideBoundary && gridCell !== undefined
    if (gridCell) {
      noCollisions = noCollisions && cellIsAvailable(gridCell)
    }
    if (!insideBoundary || !noCollisions) {
      return false
    }
  }
  return true
}

export const canMoveDown = (
  grid: types.Grid,
  actor: types.Actor,
): boolean => {
    const collisionArea = getActorCollisionBottom(actor)
    return canMoveIntoCollisionArea(grid, collisionArea)
}

export const canMoveLeft = (
  grid: types.Grid,
  actor: types.Actor,
): boolean => {
    const collisionArea = getActorCollisionLeft(actor)
    return canMoveIntoCollisionArea(grid, collisionArea)
}

export const canMoveRight = (
  grid: types.Grid,
  actor: types.Actor,
): boolean => {
    const collisionArea = getActorCollisionRight(actor)
    return canMoveIntoCollisionArea(grid, collisionArea)
}
