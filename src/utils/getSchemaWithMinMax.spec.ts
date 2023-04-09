import { number, object, string } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithMinMax from './getSchemaWithMinMax'

describe('getSchemaWithMinMax', () => {
  it('should call min and max with custom error messages if validation.min and validation.max are provided', () => {
    const name = 'TestName'
    const schema = string()

    const validation: ValidationObject = {
      min: {
        value: 3,
        errorMessage: 'Custom min error message'
      },
      max: {
        value: 10,
        errorMessage: 'Custom max error message'
      }
    }

    const schemaWithMinMax = getSchemaWithMinMax(schema, name, validation)

    expect(() => schemaWithMinMax.validateSync('12')).toThrow('Custom min error message')
    expect(() => schemaWithMinMax.validateSync('12345678910')).toThrow('Custom max error message')
  })

  it('should call min and max with default error messages if validation.min and validation.max are provided and no errorMessage is provided', () => {
    const name = 'TestName'
    const schema = string()

    const validation: ValidationObject = {
      min: {
        value: 3
      },
      max: 10
    }

    const schemaWithMinMax = getSchemaWithMinMax(schema, name, validation)

    expect(() => schemaWithMinMax.validateSync('12')).toThrow(`${name} must be at least ${3}`)
    expect(() => schemaWithMinMax.validateSync('12345678910')).toThrow(`${name} must be at most ${10}`)
  })

  it('should not call min and max if validation.min and validation.max are not provided', () => {
    const name = 'TestName'
    const schema = string()

    const validation: ValidationObject = {
      min: undefined,
      max: undefined
    }

    const schemaWithMinMax = getSchemaWithMinMax(schema, name, validation)

    expect(schemaWithMinMax.validateSync('12')).toBe('12')
  })

  it('should call min if conditions met', async () => {
    const name = 'TestName'
    const schema = number()

    const validation: ValidationObject = {
      min: {
        value: 3,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithMin = getSchemaWithMinMax(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithMin
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 2 }).test2).toThrow('Custom error message')
  })

  it('should not call min if conditions not met', async () => {
    const name = 'TestName'
    const schema = number()

    const validation: ValidationObject = {
      min: {
        value: 3,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithMin = getSchemaWithMinMax(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithMin
    })

    expect(objSchema.validateSync({ test: 'test1', test2: 2 }).test2).toBe(2)
  })

  it('should call max or min if conditions met', async () => {
    const name = 'TestName'
    const schema = number()

    const validation: ValidationObject = {
      min: {
        value: 3,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      },
      max: {
        value: 10,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithMinMax = getSchemaWithMinMax(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithMinMax
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: 2 }).test2).toThrow('Custom error message')
    expect(() => objSchema.validateSync({ test: 'test', test2: 12 }).test2).toThrow('Custom error message')
  })

  it('should not call max or min if conditions not met', async () => {
    const name = 'TestName'
    const schema = number()

    const validation: ValidationObject = {
      min: {
        value: 3,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      },
      max: {
        value: 10,
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schemaWithMinMax = getSchemaWithMinMax(schema, name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schemaWithMinMax
    })

    expect(objSchema.validateSync({ test: 'test1', test2: 2 }).test2).toBe(2)
    expect(objSchema.validateSync({ test: 'test1', test2: 12 }).test2).toBe(12)
  })

  // TODO: Pending Ref on validations unit tests
})
