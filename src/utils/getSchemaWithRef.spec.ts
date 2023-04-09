import { object, string } from 'yup'
import getSchemaWithRef from './getSchemaWithRef'

describe('getSchemaWithRef', () => {
  const schema = string()
  const name = 'TestName'

  it('should call oneOf if validation.ref is provided', () => {
    const validation = {
      ref: {
        value: 'test'
      }
    }

    const schemaWithRef = getSchemaWithRef(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithRef
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 'test2' }).test2).toThrow(`${name} must match test`)
  })

  it('should not call oneOf if validation.ref is not provided', () => {
    const validation = {
      ref: undefined
    }

    const schemaWithRef = getSchemaWithRef(schema, name, validation)

    expect(schemaWithRef.validateSync('test')).toBe('test')
  })

  it('should call oneOf if conditions met', async () => {
    const validation = {
      ref: {
        value: 'test',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithRef = getSchemaWithRef(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithRef
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 'test2' }).test2).toThrow(`${name} must match test`)
  })

  it('should not call oneOf if conditions not met', async () => {
    const validation = {
      ref: {
        value: 'test',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithRef = getSchemaWithRef(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithRef
    })

    expect(objSchema.validateSync({ test: 'test2', test2: 'test2' }).test2).toBe('test2')
  })
})
