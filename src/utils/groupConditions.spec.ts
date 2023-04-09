import { Condition } from '@/@types'
import groupConditions from './groupConditions'

describe('groupConditions', () => {
  it('should handle a mix of conditions with and without operators', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1 },
      { field: 'b', value: 2, operator: 'and' },
      { field: 'c', value: 3, operator: 'or' }
    ]

    const result = groupConditions(conditions)

    expect(result).toEqual({
      ands: [
        { field: 'a', value: 1 },
        { field: 'b', value: 2, operator: 'and' }
      ],
      ors: [
        { field: 'c', value: 3, operator: 'or' }
      ]
    })
  })

  it('should handle all conditions with the and operator', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, operator: 'and' },
      { field: 'b', value: 2, operator: 'and' },
      { field: 'c', value: 3, operator: 'and' }
    ]

    const result = groupConditions(conditions)

    expect(result).toEqual({
      ands: [
        { field: 'a', value: 1, operator: 'and' },
        { field: 'b', value: 2, operator: 'and' },
        { field: 'c', value: 3, operator: 'and' }
      ],
      ors: []
    })
  })

  it('should handle all conditions with the or operator', () => {
    const conditions: Condition[] = [
      { field: 'a', value: 1, operator: 'or' },
      { field: 'b', value: 2, operator: 'or' },
      { field: 'c', value: 3, operator: 'or' }
    ]

    const result = groupConditions(conditions)

    expect(result).toEqual({
      ands: [],
      ors: [
        { field: 'a', value: 1, operator: 'or' },
        { field: 'b', value: 2, operator: 'or' },
        { field: 'c', value: 3, operator: 'or' }
      ]
    })
  })

  it('should handle an empty conditions array', () => {
    const conditions: Condition[] = []

    const result = groupConditions(conditions)

    expect(result).toEqual({
      ands: [],
      ors: []
    })
  })
})
