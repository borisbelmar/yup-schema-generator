import getJsonSchema from './getJsonSchema'

describe('getJsonSchema', () => {
  const name = 'TestName'
  const validJson = {
    key1: 'value1',
    key2: 42,
    key3: {
      nestedKey: 'nestedValue'
    }
  }

  it('should validate a valid JSON object', () => {
    const schema = getJsonSchema(name, {})
    expect(() => schema.validateSync(validJson)).not.toThrow()
    expect(() => schema.validateSync(JSON.stringify(validJson))).not.toThrow()
    expect(() => schema.validateSync('{ asd: 12 }')).toThrow()
  })

  it('should check if the value is required when validation.required is true', () => {
    const schema = getJsonSchema(name, { required: true })

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
    expect(() => schema.validateSync(validJson)).not.toThrow()
  })

  it('should not check if the value is required when validation.required is false or not provided', () => {
    const schema = getJsonSchema(name, {})

    expect(() => schema.validateSync(undefined)).not.toThrow()
    expect(() => schema.validateSync(validJson)).not.toThrow()
  })
})
