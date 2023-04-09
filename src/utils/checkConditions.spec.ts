import { Condition } from '@/@types'
import checkConditions from './checkConditions'
import mockTestContext from '../__mocks__/testContext.mock'

describe('checkConditions', () => {
  it('should return true if conditions are undefined or empty', () => {
    const noConditions = checkConditions({ conditions: undefined, parent: mockTestContext.parent })
    expect(noConditions).toBe(false)

    const emptyConditions = checkConditions({ conditions: [], parent: mockTestContext.parent })
    expect(emptyConditions).toBe(false)
  })

  it('should return true if all and conditions are met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, compare: 'eq' },
      { field: 'b', value: 2, compare: 'eq', operator: 'and' }
    ]

    const result = checkConditions({ conditions, parent: mockTestContext.parent })
    expect(result).toBe(true)
  })

  it('should return false if any and condition is not met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, compare: 'eq' },
      { field: 'b', value: 1, compare: 'eq', operator: 'and' }
    ]

    const result = checkConditions({ conditions, parent: mockTestContext.parent })
    expect(result).toBe(false)
  })

  it('should return true if at least one or condition is met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 2, compare: 'eq', operator: 'or' },
      { field: 'b', value: 2, compare: 'eq', operator: 'or' }
    ]

    const result = checkConditions({ conditions, parent: mockTestContext.parent })
    expect(result).toBe(true)
  })

  it('should return false if no or condition is met', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 2, compare: 'eq', operator: 'or' },
      { field: 'b', value: 1, compare: 'eq', operator: 'or' }
    ]

    const result = checkConditions({ conditions, parent: mockTestContext.parent })
    expect(result).toBe(false)
  })
})
