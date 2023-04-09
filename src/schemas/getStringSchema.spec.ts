import { object, string } from 'yup'
import { ValidationObject } from '@/@types'
import getStringSchema from './getStringSchema'

describe('getStringSchema', () => {
  const name = 'TestName'

  it('should call required if validation.required is true', () => {
    const schema = getStringSchema(name, { required: true })

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
    expect(() => schema.validateSync('test')).not.toThrow()
  })

  it('should call min and max if validation.min and validation.max are provided', () => {
    const schema = getStringSchema(name, { min: 2, max: 4 })

    expect(() => schema.validateSync('a')).toThrow(`${name} must be at least 2`)
    expect(() => schema.validateSync('abcde')).toThrow(`${name} must be at most 4`)
    expect(() => schema.validateSync('abc')).not.toThrow()
  })

  it('should validate email if validation.email is true', () => {
    const schema = getStringSchema(name, { email: { value: true } })

    expect(() => schema.validateSync('notanemail')).toThrow(`${name} must be a valid email`)
    expect(() => schema.validateSync('test@example.com')).not.toThrow()
  })

  it('should validate url if validation.uri is true', () => {
    const schema = getStringSchema(name, { uri: { value: true } })

    expect(() => schema.validateSync('notauri')).toThrow(`${name} must be a valid url`)
    expect(() => schema.validateSync('https://www.example.com')).not.toThrow()
  })

  it('should validate pattern if validation.pattern is provided', () => {
    const schema = getStringSchema(name, { pattern: { value: '^[a-z]+$' } })

    expect(() => schema.validateSync('abc123')).toThrow(`${name} must match the pattern "^[a-z]+$"`)
    expect(() => schema.validateSync('abc')).not.toThrow()
  })

  it('should use custom error messages when provided', () => {
    const schema = getStringSchema(name, {
      required: { value: true, errorMessage: 'Custom required message' }
    })

    expect(() => schema.validateSync(undefined)).toThrow('Custom required message')
  })

  it('should call uri if conditions met', async () => {
    const validation: ValidationObject = {
      uri: {
        value: true,
        errorMessage: 'Custom error message uri',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = getStringSchema(name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schema
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 'test' })).toThrow('Custom error message uri')
    expect(objSchema.validateSync({ test: 'test', test2: 'https://www.example.com' })).toBeDefined()
  })

  it('should call email if conditions met', async () => {
    const validation: ValidationObject = {
      email: {
        value: true,
        errorMessage: 'Custom error message email',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = getStringSchema(name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schema
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 'test' })).toThrow('Custom error message email')
    expect(objSchema.validateSync({ test: 'test', test2: 'test@test.com' })).toBeDefined()
  })

  it('should call pattern if conditions met', async () => {
    const validation: ValidationObject = {
      pattern: {
        value: '^[a-z]+$',
        errorMessage: 'Custom error message pattern',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = getStringSchema(name, validation)

    const objSchema = object().shape({
      test: getStringSchema('test', { required: true }),
      test2: schema
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: '123' })).toThrow('Custom error message pattern')
    expect(objSchema.validateSync({ test: 'test', test2: 'abc' })).toBeDefined()
    expect(objSchema.validateSync({ test: 'test1', test2: '123' })).toBeDefined()
  })
})
