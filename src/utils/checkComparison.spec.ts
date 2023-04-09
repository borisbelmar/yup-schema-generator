import checkComparison, { CheckComparisonProps } from './checkComparison'

describe('checkComparison', () => {
  const testCases: Array<[CheckComparisonProps, boolean]> = [
    [{ compare: 'eq', fieldValue: 'test', value: 'test' }, true],
    [{ compare: 'eq', fieldValue: 5, value: 5 }, true],
    [{ compare: 'neq', fieldValue: 'test', value: 'another' }, true],
    [{ compare: 'gt', fieldValue: 6, value: 5 }, true],
    [{ compare: 'gte', fieldValue: 6, value: 6 }, true],
    [{ compare: 'lt', fieldValue: 4, value: 5 }, true],
    [{ compare: 'lte', fieldValue: 5, value: 5 }, true],
    [{ compare: 'eq', fieldValue: 'test', value: 'not-test' }, false],
    [{ compare: 'eq', fieldValue: 5, value: 6 }, false],
    [{ compare: 'neq', fieldValue: 'test', value: 'test' }, false],
    [{ compare: 'gt', fieldValue: 5, value: 6 }, false],
    [{ compare: 'gte', fieldValue: 5, value: 6 }, false],
    [{ compare: 'lt', fieldValue: 5, value: 5 }, false],
    [{ compare: 'lte', fieldValue: 6, value: 5 }, false],
    [{ compare: 'in', fieldValue: ['test', 'another'], value: 'test' }, true],
    [{ compare: 'nin', fieldValue: ['test', 'another'], value: 'test' }, false],
    [{ compare: 'in', fieldValue: ['another'], value: 'test' }, false],
    [{ compare: 'nin', fieldValue: ['another'], value: 'test' }, true]
  ]

  testCases.forEach(([props, expected], index) => {
    it(`should return ${expected} for case ${index + 1}`, () => {
      expect(checkComparison(props)).toBe(expected)
    })
  })
})
