import isEmpty from './isEmpty'

describe('isEmpty', () => {
  test('should return true for null and undefined values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  test('should return true for empty strings and strings with only whitespace characters', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(' ')).toBe(true)
    expect(isEmpty('\n\t')).toBe(true)
  })

  test('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('should return false for non-empty values', () => {
    expect(isEmpty('non-empty string')).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
  })
})
