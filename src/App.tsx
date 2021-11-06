import React from 'react';
import './App.css';
import Grid from './Grid';
import {Cells} from './types';

const cells: Cells = []
const rows = 19
const cols = 8
while (cells.length < rows) {
  const row = []
  while (row.length < cols) {
    row.push({
      x: row.length,
      y: cells.length,
      value: undefined,
    })
  }
  cells.push(row)
}


cells[3][2].value = 'dot'
cells[4][4].value = 'bloop'

const App: React.FC = () => {
  console.log(cells)
  return (
    <div className="App">
      <Grid
        cells={cells}
      />
    </div>
  );
}

export default App;
