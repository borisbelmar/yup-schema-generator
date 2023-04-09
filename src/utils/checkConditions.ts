import { TestContext } from 'yup'
import { Condition } from '@/@types'
import checkComparison from './checkComparison'
import groupConditions from './groupConditions'

interface CheckConditionsProps {
  conditions: Condition[] | undefined
  parent: TestContext['parent']
}

const checkConditions = ({
  conditions,
  parent
}: CheckConditionsProps) => {
  if (!conditions || conditions.length === 0) {
    return false
  }

  const { ands, ors } = groupConditions(conditions)

  if (ands.length) {
    const andsResult = ands.every(condition => {
      const { field, compare, value } = condition
      const fieldValue = parent[field || '']
      return checkComparison({
        compare,
        value,
        fieldValue
      })
    })

    if (!andsResult) {
      return false
    }
  }

  if (ors.length) {
    const orsResult = ors.some(condition => {
      const { field, compare, value } = condition
      const fieldValue = parent[field || '']

      return checkComparison({
        compare,
        value,
        fieldValue
      })
    })

    if (!orsResult) {
      return false
    }
  }

  return true
}

export default checkConditions
