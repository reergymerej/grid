import {setCellIfPresent, setCellIfPresentByCell} from './grid';
import * as types from './types';

const getBottomNorth = (actor: types.Actor): types.Cell[] => {
  const center = getCenter(ell)
  const relativeMap = getRelativeMap(ell, center)
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

const getLeftNorth = (actor: types.Actor): types.Cell[] => {
  // return [
  //   {
  //     value: 'collision',
  //     x: actor.x - 1,
  //     y: actor.y,
  //   },
  //   {
  //     value: 'collision',
  //     x: actor.x - 1,
  //     y: actor.y + 1,
  //   },
  //   {
  //     value: 'collision',
  //     x: actor.x - 1,
  //     y: actor.y + 2,
  //   },
  // ]
  const center = getCenter(ell)
  const relativeMap = getRelativeMap(ell, center)
  // key is y
  const furthestPerRow: {[key: string]: number} = {}
  relativeMap.forEach(coords => {
    const currentFurthest = furthestPerRow[coords.y]
    if (currentFurthest === undefined) {
      furthestPerRow[coords.y] = coords.x
    } else {
      if (coords.y < currentFurthest) {
        furthestPerRow[coords.y] = coords.x
      }
    }
  })

  const result = Object.keys(furthestPerRow).map(y => {
    const x = furthestPerRow[y]
    return {
      value: 'collision',
      x: actor.x + x - 1,
      y: actor.y + parseInt(y),
    }
  })
  return result
}

export const getActorCollisionBottom = (actor: types.Actor): types.Cell[] => {
  switch (actor.orientation) {
    case types.Orientation.north:
      return getBottomNorth(actor)
    case types.Orientation.east:
      return [
          {
            value: 'collision',
            x: actor.x,
            y: actor.y + 1,
          },
          {
            value: 'collision',
            x: actor.x + 1,
            y: actor.y + 1,
          },
          {
            value: 'collision',
            x: actor.x - 1,
            y: actor.y + 2,
          },
    ]
    default:
      throw new Error(`unhandled case "${types.Orientation[actor.orientation]}"`)
  }
}

export const getActorCollisionLeft = (actor: types.Actor): types.Cell[] => {
  switch (actor.orientation) {
    case types.Orientation.north:
      return getLeftNorth(actor)
    default:
      throw new Error(`unhandled case "${types.Orientation[actor.orientation]}"`)
  }
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

const showCollisionZones = (grid: types.Grid, actor: types.Actor): types.Grid => {
  const zones: types.Cell[][] = [
    getActorCollisionBottom(actor),
    getActorCollisionLeft(actor),
    // getActorCollisionRight(actor),
  ]
  zones.forEach((zone) => {
    zone.forEach((cell) => {
      grid = setCellIfPresentByCell(grid, cell)
    })
  })
  return grid
}

const ell: types.CellMap = [
  [ 1, 0 ],
  [ 2, 0 ],
  [ 1, 1 ],
]

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

// WARNING: mutates grid
export const setCellsForActor = (grid: types.Grid, actor: types.Actor): types.Grid => {
  switch (actor.orientation) {
    case types.Orientation.north: {
        const center = getCenter(ell)
        const relativeMap = getRelativeMap(ell, center)
        relativeMap.forEach(({x, y}) => {
          grid = setCellIfPresent(grid, actor.x + x, actor.y + y, actor.value)
        })
      }
      break

    case types.Orientation.east:
        grid = setCellIfPresent(grid, actor.x, actor.y, actor.value)
        grid = setCellIfPresent(grid, actor.x - 1, actor.y, actor.value)
        grid = setCellIfPresent(grid, actor.x - 1, actor.y + 1, actor.value)
        grid = setCellIfPresent(grid, actor.x + 1, actor.y, actor.value)
        break
    default:
      throw new Error(`unhandled case "${types.Orientation[actor.orientation]}"`)
  }

  const shouldShowCollisionZone = actor.isActive
  if (shouldShowCollisionZone) {
    grid = showCollisionZones(grid, actor)
  }
  return grid
}
