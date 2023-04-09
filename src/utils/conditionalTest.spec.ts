import { Condition } from '@/@types'
import mockTestContext from '../__mocks__/testContext.mock'
import conditionalTest from './conditionalTest'

describe('conditionalTest', () => {
  const mockValidator = (value: unknown) => typeof value === 'number'

  it('should call the validator when conditions are met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, compare: 'eq' }
    ]

    const testFn = conditionalTest({ conditions, validator: mockValidator }).bind(mockTestContext)
    expect(testFn(2)).toBe(true)
  })

  it('should not call the validator when conditions are not met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 2, compare: 'eq' }
    ]

    const testFn = conditionalTest({ conditions, validator: mockValidator }).bind(mockTestContext)
    expect(testFn('hello')).toBe(true)
  })

  it('should return false when conditions are met and validator fails', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, compare: 'eq' }
    ]

    const testFn = conditionalTest({ conditions, validator: mockValidator }).bind(mockTestContext)
    expect(testFn('hello')).toBe(false)
  })
})
