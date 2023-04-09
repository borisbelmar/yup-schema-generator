import { object, string } from 'yup'
import { ValidationObject } from '@/@types'
import getDateSchema from './getDateSchema'

describe('getDateSchema', () => {
  const name = 'TestName'

  it('should check if the value is a date', () => {
    const schema = getDateSchema(name, {})

    expect(() => schema.validateSync('anything')).toThrow(`${name} must be a date`)
    expect(() => schema.validateSync(1)).not.toThrow()
    expect(() => schema.validateSync({})).toThrow(`${name} must be a date`)
    expect(schema.validateSync(undefined)).toBe(undefined)
    expect(schema.validateSync('2023-01-01')).toBeTruthy()
  })

  it('should call required if validation.required is true', () => {
    const validation = {
      required: true
    }

    const schema = getDateSchema(name, validation)

    expect(() => schema.validateSync(undefined)).toThrow(`${name} is required`)
  })

  it('should call min and max if validation.min and validation.max are provided', () => {
    const validation = {
      min: '2023-01-01',
      max: '2023-12-31'
    }

    const schema = getDateSchema(name, validation)

    expect(() => schema.validateSync('2022-12-31')).toThrow(`${name} must be after ${validation.min}`)
    expect(() => schema.validateSync('2024-01-01')).toThrow(`${name} must be before ${validation.max}`)
  })

  it('should call min if validation.min is provided and validation.max is not provided', () => {
    const validation = {
      min: '2023-01-01'
    }

    const schema = getDateSchema(name, validation)

    expect(() => schema.validateSync('2022-12-31')).toThrow(`${name} must be after ${validation.min}`)
  })

  it('should call max if validation.max is provided and validation.min is not provided', () => {
    const validation = {
      max: '2023-12-31'
    }

    const schema = getDateSchema(name, validation)

    expect(() => schema.validateSync('2024-01-01')).toThrow(`${name} must be before ${validation.max}`)
  })

  it('should call min and max if validation.min and validation.max are provided and validation.min is greater than validation.max', () => {
    const validation = {
      min: '2023-12-31',
      max: '2023-01-01'
    }

    const schema = getDateSchema(name, validation)

    expect(() => schema.validateSync('2023-01-01')).toThrow(`${name} must be after ${validation.min}`)
    expect(() => schema.validateSync('2023-12-31')).toThrow(`${name} must be before ${validation.max}`)
  })

  it('should call min if conditions met', async () => {
    const validation: ValidationObject = {
      min: {
        value: '2023-01-01',
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = getDateSchema(name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schema
    })

    expect(() => objSchema.validateSync({ test: 'test', test2: '2022-01-01' }).test2).toThrow('Custom error message')
  })

  it('should not call min if conditions not met', async () => {
    const validation: ValidationObject = {
      min: {
        value: '2023-01-01',
        errorMessage: 'Custom error message',
        conditions: [{
          field: 'test',
          value: 'test'
        }]
      }
    }

    const schema = getDateSchema(name, validation)

    const objSchema = object().shape({
      test: string(),
      test2: schema
    })

    expect(objSchema.validateSync({ test: 'test1', test2: '2022-01-01' }).test2).toBeTruthy()
  })

  // TODO: Pending Ref on validations unit tests
})
