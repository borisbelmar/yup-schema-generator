import { ValidationObject } from '@/@types'
import validationObjectMock from '../__mocks__/validationObject.mock'
import getValue from './getValue'

describe('getValue', () => {
  it('should return the value and undefined error message for a key without a ValidationValue', () => {
    const { value, errorMessage } = getValue<boolean>(validationObjectMock, 'required')
    expect(value).toBe(true)
    expect(errorMessage).toBeUndefined()
  })

  it('should return the value and error message for a key with a ValidationValue', () => {
    const { value, errorMessage } = getValue<number | string>(validationObjectMock, 'min')
    expect(value).toBe(0)
    expect(errorMessage).toBe('Value must be greater than or equal to 0')
  })

  it('should return the value and undefined error message for a key with a ValidationValue that has no errorMessage', () => {
    const { value, errorMessage } = getValue<number | string>(validationObjectMock, 'max')
    expect(value).toBe(100)
    expect(errorMessage).toBeUndefined()
  })

  it('should return the value and undefined error message for a non-existing key', () => {
    const { value, errorMessage } = getValue<string>(validationObjectMock, 'nonExistingKey' as keyof ValidationObject)
    expect(value).toBeUndefined()
    expect(errorMessage).toBeUndefined()
  })

  // TODO: Unit tests for ref and defaultValue
})
