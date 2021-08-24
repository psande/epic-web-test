/**
 * Given a user input string of a matrix in the format:
 * [1,2,3]
 * [4,5,6]
 * [7,8,9]
 *
 * Will return the string:
 * 1, 2, 3, 6, 9, 8, 7, 4, 5
 *
 * Note: Aimed at clarity more than efficiency, so extra exceptions, checks and comments have been added.
 */
export default function clockwiseMatrix (textInput: string) {
  const output: Array<number> = []
  const input: Array<Array<number>> = []
  let sizeX: (number | undefined)

  // Parse arrays.
  textInput.split('\n').forEach((textLine) => {
    const parsedLine = JSON.parse(textLine)

    // Check if it is an array and that each item is a number.
    if (Array.isArray(parsedLine) && parsedLine.every(x => typeof x === 'number')) {

      // Store the length of first array.
      if (sizeX === undefined) sizeX = parsedLine.length

      // Check every array have the same length.
      if (parsedLine.length === sizeX) {
        input[input.length] = parsedLine
      } else {
        throw new RangeError('Arrays are different lengths.')
      }
    } else {
      throw new TypeError('Not a number array.')
    }
  })

  // Once input is parsed, get the
  if (typeof sizeX === 'number' && !!sizeX) {
    for (let i = 0; i < sizeX * input.length; i++) {
      const [x, y] = spiralAt(sizeX, input.length, i)
      output[i] = input[y][x]
    }
    return output.join(', ')
  }
  throw new Error('No output.')
}

// Returns the position in the spiral.
function spiralAt (sizeX: number, sizeY: number, position: number): Array<number> {
  // Conditions Checks
  if (sizeX <= 0) throw new RangeError('sizeX must be greater than 0')
  if (sizeY <= 0) throw new RangeError('sizeY must be greater than 0')
  if (position < 0 || position >= sizeX * sizeY)
    throw new RangeError(`Position must be in the range >= 0 and < ${sizeX * sizeY}. Position used: ${position}.`)

  if (position < sizeX) {
    // First Row
    return [position, 0]

  } else if (position < sizeX + (sizeY - 1)) {
    // Last Column
    return [sizeX - 1, 1 + position - sizeX]

  } else if (position < sizeX + (sizeY - 1) + (sizeX - 1)) {
    // Last Row
    return [(sizeX - 2) - (position - (sizeX + (sizeY - 1))), sizeY - 1]

  } else if (position < sizeX + (sizeY - 1) + (sizeX - 1) + (sizeY - 2)) {
    // First Column
    return [0, (sizeY - 2) - (position - (sizeX + (sizeY - 1) + (sizeX - 1)))]

  } else {
    // If not in the edges, we move to a subset of the matrix.
    const [x, y] = spiralAt(sizeX - 2, sizeY - 2, position - (sizeX + sizeY - 1 + sizeX - 1 + sizeY - 2))
    return [x + 1, y + 1]
  }
}