import React from 'react';
import './App.css';
import Grid from './Grid';
import * as types from './types';

const initalCells: types.Cells = []
const rows = 10
const cols = 8
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

const newActor = (): types.Actor => ({
  value: 'amanda',
  x: 0,
  y: 0,
  mx: 0,
  my: 0,
})

const App: React.FC = () => {
  const [cells, setCells] = React.useState<types.Cells>(initalCells)
  const [activeActor, setActiveActor] = React.useState<types.Actor>(newActor())
  const [actors, setActors] = React.useState<types.Actor[]>([])

  React.useEffect(() => {
    const nextCells: types.Cells = clearGrid(cells)
    actors.forEach((actor) => {
      nextCells[actor.y][actor.x].value = actor.value
    })
    nextCells[activeActor.y][activeActor.x].value = activeActor.value
    setCells(nextCells)
  }, [activeActor, actors/*, cells*/])

  const stopControl = React.useCallback((actor: types.Actor) => {
    setActors([...actors, actor])
    setActiveActor(newActor())
  }, [actors])

  const handleDown = React.useCallback(() => {
    const bottom = cells.length
    const nextY = activeActor.y + 1
    const nextRow = cells[nextY]
    const nextRowExists = nextRow !== undefined
    const nextCellEmpty = nextRowExists && nextRow[activeActor.x].value === undefined
    const canMove = nextY < bottom
      && nextCellEmpty
    if (!canMove) {
      stopControl(activeActor)
    } else {
      setActiveActor({
        ...activeActor,
        y: nextY,
      })
    }
  }, [activeActor, cells.length, stopControl])

  const handleRight = React.useCallback(() => {
    const actor = activeActor
    const right = cells[0].length
    const canMove = actor.x + 1 < right
    if (canMove) {
      setActiveActor({
        ...activeActor,
        x: activeActor.x + 1
      })
    }
  }, [activeActor, cells])

  const handleLeft = React.useCallback(() => {
    const actor = activeActor
    const left = 0
    const canMove = actor.x - 1 >= left
    if (canMove) {
      setActiveActor({
        ...activeActor,
        x: activeActor.x - 1
      })
    }
  }, [activeActor])

  const keydownHandler = React.useCallback((event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          handleDown()
          break
        case 'ArrowRight':
          handleRight()
          break
        case 'ArrowLeft':
          handleLeft()
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
