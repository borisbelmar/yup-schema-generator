import getBooleanSchema from './getBooleanSchema'

describe('getBooleanSchema', () => {
  const name = 'TestName'

  it('should check if the value is a boolean', () => {
    const schema = getBooleanSchema(name, {})

    expect(() => schema.validateSync('anything')).toThrow(`${name} must be a boolean`)
    expect(() => schema.validateSync(2)).toThrow(`${name} must be a boolean`)
    expect(() => schema.validateSync({})).toThrow(`${name} must be a boolean`)
    expect(schema.validateSync(undefined)).toBe(undefined)
    expect(schema.validateSync(true)).toBe(true)
  })

  it('should call required if validation.required is true', () => {
    const validation = {
      required: true
    }

    const schema = getBooleanSchema(name, validation)

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
    expect(schema.validateSync(true)).toBe(true)
    expect(schema.validateSync(false)).toBe(false)
  })

  // TODO: oneOf Themes?
})
