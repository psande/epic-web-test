// Task 1 Function
import clockwiseMatrix from './clockwiseMatrix'

test('Test Success: 1x1', () => {
  expect(clockwiseMatrix(`[1]`)).toBe('1')
})

test('Test Success: 2x2', () => {
  expect(clockwiseMatrix(
    `[1, 2]
              [3, 4]`)).
    toBe('1, 2, 4, 3')
})

test('Test Success: 3x3', () => {
  expect(clockwiseMatrix(
    `[ 1,  2,  3]
              [ 4,  5,  6]
              [ 7,  8,  9]`)).
    toBe('1, 2, 3, 6, 9, 8, 7, 4, 5')
})

test('Test Success: 3x4', () => {
  expect(clockwiseMatrix(
    `[ 1,  2,  3]
              [ 4,  5,  6]
              [ 7,  8,  9]
              [10, 11, 12]`)).
    toBe('1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8')
})

test('Test Success: 5x4', () => {
  expect(clockwiseMatrix(
    `[ 1,  2,  3,  4,  5]
              [ 6,  7,  8,  9, 10]
              [11, 12, 13, 14, 15]
              [16, 17, 18, 19, 20]`)).
    toBe('1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12')
})

test('Test Success: 6x1', () => {
  expect(clockwiseMatrix(`[1, 2, 3, 4, 5, 6]`)).toBe('1, 2, 3, 4, 5, 6')
})

test('Test Success: 1x6', () => {
  expect(clockwiseMatrix(`[1]
                                   [2]
                                   [3]
                                   [4]
                                   [5]
                                   [6]`)).
    toBe('1, 2, 3, 4, 5, 6')
})

test('Test Error: Empty parameter.', () => {
  expect(() => clockwiseMatrix()).toThrowError()
})

test('Test Error: Empty string.', () => {
  expect(() => clockwiseMatrix('')).toThrowError()
})

test('Test Error: Empty array.', () => {
  expect(() => clockwiseMatrix('[]')).toThrowError()
})

test('Test Error: Array with error.', () => {
  expect(() => clockwiseMatrix('[1 2, 3]')).toThrowError()
})

test('Test Error: Arrays on same line.', () => {
  expect(() => clockwiseMatrix('[1, 2, 3][1, 2, 3]')).toThrowError()
})

test('Test Error: Arrays with a string.', () => {
  expect(() => clockwiseMatrix('[1, 2, "3"]')).toThrowError('')
})

test('Test Error: Arrays with different lengths.', () => {
  expect(() => clockwiseMatrix(`[1]
                                                [2, 3]`)).toThrowError('')
})