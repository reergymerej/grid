import {setCellIfPresent, setCellIfPresentByCell} from './grid';
import * as types from './types';
import {rotate} from './grid-util';
import {getRandomItem} from './util';
import {cols} from './config';
import {ell, ess, tee} from './actors';

const getBottom = (actor: types.Actor): types.Cell[] => {
  const rotated = getRotatedActor(actor)
  const center = getCenter(rotated)
  const relativeMap = getRelativeMap(rotated, center)
  // key is x
  const lowestRowPerColumn: {[key: string]: number} = {}
  relativeMap.forEach(coords => {
    const currentFurthest = lowestRowPerColumn[coords.x]
    if (currentFurthest === undefined) {
      lowestRowPerColumn[coords.x] = coords.y
    } else {
      if (coords.y > currentFurthest) {
        lowestRowPerColumn[coords.x] = coords.y
      }
    }
  })
  const result = Object.keys(lowestRowPerColumn).map(x => {
    const y = lowestRowPerColumn[x]
    return {
      value: 'collision',
      x: actor.x + parseInt(x),
      y: actor.y + y + 1,
    }
  })
  return result
}

const getFurthestX = (direction: number) => (actor: types.Actor): types.Cell[] => {
  const rotated = getRotatedActor(actor)
  const center = getCenter(rotated)
  const relativeMap = getRelativeMap(rotated, center)
  // key is y
  const furthestPerRow: {[key: string]: number} = {}
  const isFurther = (value: number, basis: number) => {
    return direction > 0
      ? value > basis
      : value < basis
  }
  relativeMap.forEach(coords => {
    const currentFurthest = furthestPerRow[coords.y]
    if (currentFurthest === undefined) {
      furthestPerRow[coords.y] = coords.x
    } else {
      if (isFurther(coords.x, currentFurthest)) {
        furthestPerRow[coords.y] = coords.x
      }
    }
  })

  const result = Object.keys(furthestPerRow).map(y => {
    const x = furthestPerRow[y]
    return {
      value: 'collision',
      x: actor.x + x + direction,
      y: actor.y + parseInt(y),
    }
  })
  return result
}

const getLeft = getFurthestX(-1)
const getRight = getFurthestX(1)

export const getActorCollisionBottom = (actor: types.Actor): types.Cell[] => {
  return getBottom(actor)
}

export const getActorCollisionLeft = (actor: types.Actor): types.Cell[] => {
  return getLeft(actor)
}

export const getActorCollisionRight = (actor: types.Actor): types.Cell[] => {
  return getRight(actor)
}

const showCollisionZones = (grid: types.Grid, actor: types.Actor): types.Grid => {
  const zones: types.Cell[][] = [
    getActorCollisionBottom(actor),
    getActorCollisionLeft(actor),
    getActorCollisionRight(actor),
  ]
  zones.forEach((zone) => {
    zone.forEach((cell) => {
      grid = setCellIfPresentByCell(grid, cell)
    })
  })
  return grid
}

const getCenter = (shape: types.CellMap): types.Coords => {
  for (let y = 0; y < shape.length; y++) {
    const row = shape[y]
    for (let x = 0; x < shape.length; x++) {
      const value = row[x]
      if (value === 2) {
        return {
          x,
          y,
        }
      }
    }
  }
  throw new Error('missing center definition "2"')
}

const getRelativeMap = (shape: types.CellMap, center: types.Coords): types.Coords[] => {
  const result: types.Coords[] = []
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        result.push({
          x: x - center.x,
          y: y - center.y,
        })
      }
    })
  })
  return result
}

const derefArray = (arr: any[][]): any[][] => {
  const result: any[][] = []
  arr.forEach((row) => {
    const newRow = [...row]
    result.push(newRow)
  })
  return result
}

const getActorShape = (actor: types.Actor): types.CellMap => {
  switch (actor.shape) {
    case types.Shape.ell:
      return ell
    case types.Shape.ess:
      return ess
    case types.Shape.tee:
      return tee
    default:
      throw new Error(`unhandled case "${types.Shape[actor.shape]}"`)
  }
}

const getRotatedActor = (actor: types.Actor): types.CellMap => {
  const shape = getActorShape(actor)
  let rotated = derefArray(shape)

  switch (actor.orientation) {
    case types.Orientation.north:
      break;
    case types.Orientation.east:
      rotated = rotate(shape, 90)
      break;
    case types.Orientation.south:
      rotated = rotate(shape, 180)
      break;
    case types.Orientation.west:
      rotated = rotate(shape, 270)
      break;
    default:
      throw new Error(`unhandled case "${types.Orientation[actor.orientation]}"`)
  }
  return rotated
}

// WARNING: mutates grid
export const setCellsForActor = (grid: types.Grid, actor: types.Actor): types.Grid => {
  const rotated = getRotatedActor(actor)
  const center = getCenter(rotated)
  const relativeMap = getRelativeMap(rotated, center)
  relativeMap.forEach(({x, y}) => {
    grid = setCellIfPresent(grid, actor.x + x, actor.y + y, actor.value)
  })

  const shouldShowCollisionZone = actor.isActive
  if (shouldShowCollisionZone) {
    grid = showCollisionZones(grid, actor)
  }
  return grid
}

const getRandomShape = (): types.Shape => {
  const shapes = [
    types.Shape.ess,
    types.Shape.ell,
    types.Shape.tee,
  ]
  return getRandomItem(shapes)
}

export const newActor = (): types.Actor => ({
  value: 'amanda',
  x: Math.floor(cols/2),
  y: 2,
  mx: 0,
  my: 0,
  isActive: true,
  orientation: types.Orientation.north,
  shape: getRandomShape(),
})
