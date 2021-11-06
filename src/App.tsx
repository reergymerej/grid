import React from 'react';
import './App.css';

const Cell: React.FC  = ({children}) => (
  <div className="Cell">
    {children}
  </div>
)

type RowProps = {
  cols: number;
  number?: number;
}

const Row: React.FC<RowProps> = ({number, cols}) => {
  const cells = []
  while (cells.length < cols) {
    cells.push(
      <Cell>
        {number !== undefined && number + ", "} {cells.length}
      </Cell>
    )
  }
  return (
    <div className="Row">
      { cells }
    </div>
  )
}

type GridProps = {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const r = []
  while (r.length < rows) {
    r.push(
      <Row number={r.length} cols={cols} />
    )
  }
  return (
    <div className="Grid">
      {r}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Grid
        cols={8}
        rows={19}
      />
    </div>
  );
}

export default App;
