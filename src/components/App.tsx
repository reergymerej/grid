import React from 'react';
import '../App.css';
import Grid from './Grid';
import * as types from '../types';
import {rows, cols} from '../config';

const initalCells: types.Cells = []
while (initalCells.length < rows) {
  const row = []
  while (row.length < cols) {
    row.push({
      x: row.length,
      y: initalCells.length,
      value: 'actor-jemma',
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

const App: React.FC = () => {
  const [cells, setCells] = React.useState<types.Cells>(initalCells)

  const handleKeyDown = React.useCallback(() => {
    let nextCells: types.Cells = clearGrid(cells)
    // TODO: change stuff here
    setCells(nextCells)
  }, [cells])

  const keydownHandler = React.useCallback((event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'j':
        case 's':
        case 'ArrowRight':
        case 'l':
        case 'd':
        case 'ArrowLeft':
        case 'h':
        case 'a':
        case 'ArrowUp':
        case 'k':
        case 'w':
        default:
          handleKeyDown()
      }
    }, [handleKeyDown])

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
