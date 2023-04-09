import getArraySchema from './getArraySchema'

describe('getArraySchema', () => {
  const name = 'TestName'

  it('should check if the value is an array', () => {
    const schema = getArraySchema(name, {})

    expect(() => schema.validateSync('anything')).toThrow(`${name} must be an array`)
    expect(() => schema.validateSync(1)).toThrow(`${name} must be an array`)
    expect(() => schema.validateSync({})).toThrow(`${name} must be an array`)
    expect(schema.validateSync(undefined)).toBe(undefined)
    expect(schema.validateSync([])).toStrictEqual([])
  })

  it('should call required if validation.required is true', () => {
    const validation = {
      required: true
    }

    const schema = getArraySchema(name, validation)

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
  })

  it('should call min and max if validation.min and validation.max are provided', () => {
    const validation = {
      min: 2,
      max: 4
    }

    const schema = getArraySchema(name, validation)

    expect(() => schema.validateSync([1])).toThrow(`${name} must be at least 2`)
    expect(() => schema.validateSync([1, 2, 3, 4, 5])).toThrow(`${name} must be at most 4`)
  })

  it('should call min if validation.min is provided and validation.max is not provided', () => {
    const validation = {
      min: 2
    }

    const schema = getArraySchema(name, validation)

    expect(() => schema.validateSync([1])).toThrow(`${name} must be at least 2`)
  })
})
