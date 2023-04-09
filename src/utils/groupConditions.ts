import { Condition } from '@/@types'

const groupConditions = (conditions: Condition[]) => conditions.reduce<{
    ands: Condition[]
    ors: Condition[]
  }>((acc, curr) => {
    if (curr.operator !== 'or') {
      return { ands: [...acc.ands, curr], ors: acc.ors }
    }
    return { ands: acc.ands, ors: [...acc.ors, curr] }
  }, { ands: [], ors: [] })

export default groupConditions
