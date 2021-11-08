import React from 'react';
import {showCoords} from '../config';
import * as types from '../types';

type CellProps = {
  value: types.Cell['value'];
}

const Cell: React.FC<CellProps>  = ({children, value}) => {
  const className = `Cell ${ value !== undefined ? value : ''}`
  return (
    <div className={className}>
      {children}
    </div>
  )
}

type RowProps = {
  cells: types.Cell[]
}

const Row: React.FC<RowProps> = ({cells}) => {
  return (
    <div className="Row">
      {cells.map(cell => (
        <Cell
          key={cell.x}
          value={cell.value}
        >
          {showCoords && `${cell.x}, {cell.y}`}
        </Cell>
      ))}
    </div>
  )
}

type GridProps = {
  cells: types.Cells
}

const Grid: React.FC<GridProps> = ({ cells }) => {
  return (
    <div className="Grid">
      {cells.map((row, i) => (
        <Row
          key={i}
          cells={row}
        />
      ))}
    </div>
  )
}

export default Grid
