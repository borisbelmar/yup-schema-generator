import getNumberSchema from './getNumberSchema'

describe('getNumberSchema', () => {
  const name = 'TestName'

  it('should check if the value is a number', () => {
    const schema = getNumberSchema(name, {})
    expect(() => schema.validateSync('anything')).toThrow(`${name} must be a number`)
    expect(() => schema.validateSync({})).toThrow(`${name} must be a number`)
    expect(() => schema.validateSync(undefined)).not.toThrow()
    expect(() => schema.validateSync(1)).not.toThrow()
  })

  it('should call required if validation.required is true', () => {
    const schema = getNumberSchema(name, { required: true })

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
    expect(() => schema.validateSync(1)).not.toThrow()
  })

  it('should call min and max if validation.min and validation.max are provided', () => {
    const schema = getNumberSchema(name, { min: 2, max: 4 })

    expect(() => schema.validateSync(1)).toThrow(`${name} must be at least 2`)
    expect(() => schema.validateSync(5)).toThrow(`${name} must be at most 4`)
    expect(() => schema.validateSync(3)).not.toThrow()
  })

  it('should call oneOf if validation.oneOf is provided', () => {
    const schema = getNumberSchema(name, { oneOf: { value: [2, 4, 6] } })

    expect(() => schema.validateSync(1)).toThrow(`${name} must be one of 2, 4, 6`)
    expect(() => schema.validateSync(2)).not.toThrow()
    expect(() => schema.validateSync(6)).not.toThrow()
  })
})
