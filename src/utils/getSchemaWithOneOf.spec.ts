// Import necessary dependencies
import { boolean, object, string } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithOneOf from './getSchemaWithOneOf'

describe('getSchemaWithOneOf', () => {
  const schema = string()
  const name = 'TestName'

  it('should call oneOf with custom error message if validation.oneOf is provided', () => {
    const validation: ValidationObject = {
      oneOf: {
        value: ['one', 'two'],
        errorMessage: 'Custom error message'
      }
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    expect(schemaWithOneOf.validate('three')).rejects.toThrow('Custom error message')
  })

  it('should call oneOf with default error message if validation.oneOf is provided and no errorMessage is provided', () => {
    const validation: ValidationObject = {
      oneOf: {
        value: ['one', 'two']
      }
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    expect(() => schemaWithOneOf.validateSync('three')).toThrow(`${name} must be one of one, two`)
  })

  it('should call oneOf and not throw error if value is in oneOf', () => {
    const validation: ValidationObject = {
      oneOf: {
        value: ['one', 'two']
      }
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    expect(schemaWithOneOf.validateSync('one')).toBe('one')
    expect(schemaWithOneOf.validateSync('two')).toBe('two')
    expect(() => schemaWithOneOf.validateSync('three')).toThrow(`${name} must be one of one, two`)

    const validation2: ValidationObject = {
      oneOf: {
        value: [true]
      }
    }

    const schemaWithOneOf2 = getSchemaWithOneOf(boolean(), name, validation2)

    expect(schemaWithOneOf2.validateSync(true)).toBe(true)
    expect(() => schemaWithOneOf2.validateSync(false)).toThrow(`${name} must be one of true`)
  })

  it('should not call oneOf if validation.oneOf is not provided', () => {
    const validation = {
      oneOf: undefined
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    expect(schemaWithOneOf.validateSync('three')).toBe('three')
  })

  it('should call oneOf if conditions met', async () => {
    const validation: ValidationObject = {
      oneOf: {
        value: ['one', 'two'],
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithOneOf
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 'three' }).test2).toThrow('Custom error message')
  })

  it('should not call oneOf if conditions not met', async () => {
    const validation: ValidationObject = {
      oneOf: {
        value: ['one', 'two'],
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithOneOf = getSchemaWithOneOf(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithOneOf
    })

    expect(objSchema.validateSync({ test: 'test1', test2: 'three' }).test2).toBe('three')
  })
})
