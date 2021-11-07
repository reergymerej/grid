import React from 'react';
import {setCellsForActor} from '../actor';
import '../App.css';
import Grid from './Grid';
import * as types from '../types';
import {canMoveDown, canMoveLeft, canMoveRight, rotate} from '../util';

const initalCells: types.Cells = []
const rows = 15
const cols = 9
while (initalCells.length < rows) {
  const row = []
  while (row.length < cols) {
    row.push({
      x: row.length,
      y: initalCells.length,
      value: undefined,
    })
  }
  initalCells.push(row)
}

// get a copy of the grid, all empty cells
const clearGrid = (grid: types.Cells): types.Cells => {
  return grid.map((row): types.Cell[] => {
    return row.map((r): types.Cell => {
      return {
        ...r,
        value: undefined,
      }
    })
  })
}

const getRandomShape = (): types.Shape => {
  if (Math.random() <= 0.5) {
    return types.Shape.ell
  }
  return types.Shape.ess
}

const newActor = (): types.Actor => ({
  value: 'amanda',
  x: Math.floor(cols/2),
  y: 2,
  mx: 0,
  my: 0,
  isActive: true,
  orientation: types.Orientation.north,
  shape: getRandomShape(),
})

const App: React.FC = () => {
  const [cells, setCells] = React.useState<types.Cells>(initalCells)
  const [activeActor, setActiveActor] = React.useState<types.Actor>(newActor())
  const [actors, setActors] = React.useState<types.Actor[]>([])

  React.useEffect(() => {
    let nextCells: types.Cells = clearGrid(cells)
    actors.forEach((actor) => {
      nextCells = setCellsForActor(nextCells, actor)
    })
    // set cells for actor
    nextCells = setCellsForActor(nextCells, activeActor)
    setCells(nextCells)
  }, [activeActor, actors/*, cells*/])

  const stopControl = React.useCallback((actor: types.Actor) => {
    actor.isActive =  false
    setActors([...actors, actor])
    setActiveActor(newActor())
  }, [actors])

  const handleDown = React.useCallback(() => {
    const nextY = activeActor.y + 1
    if (!canMoveDown(cells, activeActor)) {
      stopControl(activeActor)
    } else {
      setActiveActor({
        ...activeActor,
        y: nextY,
      })
    }
  }, [activeActor, cells, stopControl])

  const handleLeft = React.useCallback(() => {
    const nextX = activeActor.x - 1
    if (canMoveLeft(cells, activeActor)) {
      setActiveActor({
        ...activeActor,
        x: nextX,
      })
    }
  }, [activeActor, cells])

  const handleRight = React.useCallback(() => {
    const nextX = activeActor.x + 1
    if (canMoveRight(cells, activeActor)) {
      setActiveActor({
        ...activeActor,
        x: nextX,
      })
    }
  }, [activeActor, cells])

  const handleUp = React.useCallback(() => {
    setActiveActor(rotate(activeActor))
  }, [activeActor])

  const keydownHandler = React.useCallback((event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'j':
        case 's':
          handleDown()
          break
        case 'ArrowRight':
        case 'l':
        case 'd':
          handleRight()
          break
        case 'ArrowLeft':
        case 'h':
        case 'a':
          handleLeft()
          break
        case 'ArrowUp':
        case 'k':
        case 'w':
          handleUp()
          break
        default:
      }
    }, [handleDown, handleLeft, handleRight])

  React.useEffect(() => {
    // only responsible for adding/removing handler
    window.addEventListener('keydown', keydownHandler)
    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])

  return (
    <div className="App">
      <Grid cells={cells} />
    </div>
  );
}

export default App;
