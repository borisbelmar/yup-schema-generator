import { number, object } from 'yup'
import { Condition } from '@/@types'
import getSchemaWithConditionalTest from './getSchemaWithConditionalTest'

describe('getSchemaWithConditionalTest', () => {
  const field = 'required'
  const conditions: Condition[] = [{ field: 'a', value: 1, compare: 'eq' }]
  const validator = (value: unknown) => value === 42
  const errorMessage = 'Is not 42'

  it('should return the original schema if no conditions are provided', () => {
    const schema = number()
    const result = getSchemaWithConditionalTest({
      field,
      schema,
      conditions: undefined,
      validator,
      errorMessage
    })

    expect(result).toBe(schema)
  })

  it('should add a test with the specified field name, validator, and error message', async () => {
    const schema = number()
    const result = getSchemaWithConditionalTest({
      field,
      schema,
      conditions,
      validator,
      errorMessage
    })

    const validationValues = { a: 1 }
    const completeSchema = object().shape({
      a: number(),
      testField: result
    })

    const valid = await completeSchema.isValid({ ...validationValues, testField: 42 })
    expect(valid).toBe(true)

    const invalid = await completeSchema
      .validate({ ...validationValues, testField: 41 })
      .catch(e => e.message)
    expect(invalid).toBe(errorMessage)
  })

  it('should not run the validator if conditions are not met', async () => {
    const schema = number()
    const result = getSchemaWithConditionalTest({
      field,
      schema,
      conditions,
      validator,
      errorMessage
    })

    const validationValues = { a: 2 }
    const completeSchema = object().shape({
      a: number(),
      testField: result
    })

    const valid = await completeSchema.isValid({ ...validationValues, testField: 42 })
    expect(valid).toBe(true)
  })
})
