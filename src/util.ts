import * as types from './types';

export const setCellsForActor = (cells: types.Grid, actor: types.Actor): types.Grid => {
    cells[actor.y][actor.x].value = actor.value
    cells[actor.y + 1][actor.x].value = actor.value
    cells[actor.y + 2][actor.x].value = actor.value
    cells[actor.y + 2][actor.x + 1].value = actor.value
    return cells
}

export const canMoveDown = (
  grid: types.Grid,
  actor: types.Actor,
): boolean => {
    const bottom = grid.length
    const { y, x } = actor
    const speed = 1
    const nextY = y + speed
    const actorHeight = 2
    const nextRow = grid[nextY + actorHeight]
    const nextRowExists = nextRow !== undefined
    const nextCellEmpty = nextRowExists && nextRow[x].value === undefined
    const nextCellEmpty2 = nextCellEmpty && nextRowExists && nextRow[x + 1].value === undefined
    return nextY < bottom && nextCellEmpty && nextCellEmpty2
}
