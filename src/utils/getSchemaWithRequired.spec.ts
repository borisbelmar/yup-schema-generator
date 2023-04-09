import { object, string } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithRequired from './getSchemaWithRequired'

describe('getSchemaWithRequired', () => {
  const name = 'TestName'

  it('should call required with custom error message if validation.required is true', () => {
    const validation: ValidationObject = {
      required: {
        value: true,
        errorMessage: 'Custom error message'
      }
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    expect(() => schemaWithRequired.validateSync(undefined)).toThrow('Custom error message')
  })

  it('should call required with default error message if validation.required is true and no errorMessage is provided', () => {
    const validation: ValidationObject = {
      required: {
        value: true
      }
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    expect(() => schemaWithRequired.validateSync(undefined)).toThrow(`${name} is required`)
  })

  it('should not call required if validation.required is false', () => {
    const validation: ValidationObject = {
      required: {
        value: false
      }
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    expect(schemaWithRequired.validateSync(undefined)).toBe(undefined)
  })

  it('should not call required if validation.required is not provided', () => {
    const validation = {}

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    expect(schemaWithRequired.validateSync(undefined)).toBe(undefined)
  })

  it('should not call required if validation.required is true and value null', () => {
    const validation: ValidationObject = {
      required: true
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    expect(() => schemaWithRequired.validateSync(null)).toThrow(`${name} is required`)
  })

  it('should call required if conditions met', async () => {
    const validation: ValidationObject = {
      required: {
        value: true,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithRequired
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: undefined }).test2).toThrow('Custom error message')
  })

  it('should not call required if conditions not met', async () => {
    const validation: ValidationObject = {
      required: {
        value: true,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = string()

    const schemaWithRequired = getSchemaWithRequired(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithRequired
    })

    expect(objSchema.validateSync({ test: 'test1', test2: undefined }).test2).toBe(undefined)
  })
})
