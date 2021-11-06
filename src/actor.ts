import {setCellIfPresent, setCellIfPresentByCell} from './grid';
import * as types from './types';

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

export const getActorCollisionBottom = (actor: types.Actor): types.Cell[] => {
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

export const getActorCollisionLeft = (actor: types.Actor): types.Cell[] => {
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

export const getActorCollisionRight = (actor: types.Actor): types.Cell[] => {
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

