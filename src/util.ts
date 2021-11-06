import {getActorCollisionBottom, getActorCollisionLeft, getActorCollisionRight} from './actor';
import {gridReference} from './grid';
import * as types from './types';

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

export const rotate = (actor: types.Actor): types.Actor => {
  const order: types.Orientation[] = [
    types.Orientation.north,
    types.Orientation.east,
    types.Orientation.south,
    types.Orientation.west,
  ]
  const currentIndex = order.indexOf(actor.orientation)
  const nextIndex = currentIndex + 1
  const orientation = order[nextIndex % order.length]
  return {
    ...actor,
    orientation,
  }
}
