import {flip, rotate} from "./grid-util"

describe('grid rotation', () => {
  it('should rotate 90', () => {
    const input = [
      [1, 0],
      [1, 0],
      [2, 0],
      [1, 0],
    ]
    const expected = [
      [1, 2, 1, 1],
      [0, 0, 0, 0]
    ]
    const actual = rotate(input, 90)
    expect(actual).toEqual(expected)
  })

  it('should rotate 180', () => {
    const input = [
      [1, 0],
      [1, 0],
      [2, 0],
      [1, 0],
    ]
    const expected = [
      [0, 1],
      [0, 2],
      [0, 1],
      [0, 1],
    ]
    const actual = rotate(input, 180)
    expect(actual).toEqual(expected)
  })

  it('should rotate 270', () => {
    const input = [
      [1, 0],
      [1, 0],
      [2, 0],
      [1, 0],
    ]
    const expected = [
      [0, 0, 0, 0],
      [1, 1, 2, 1],
    ]
    const actual = rotate(input, 270)
    expect(actual).toEqual(expected)
  })
})

describe('grid flip', () => {
  it('should flip horizontally', () => {
    const input = [
      [1, 0],
      [1, 1],
      [2, 0],
      [1, 0],
    ]
    const expected = [
      [0, 1],
      [1, 1],
      [0, 2],
      [0, 1],
    ]
    const actual = flip(input)
    expect(actual).toEqual(expected)
  })
})
