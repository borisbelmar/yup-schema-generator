import isEmpty from './isEmpty'

export interface CheckComparisonProps {
  compare?: string
  fieldValue: unknown
  value: unknown
}

const checkComparison = ({
  compare,
  fieldValue,
  value
}: CheckComparisonProps) => {
  switch (compare) {
    case 'eq':
      return fieldValue === value
    case 'neq':
      return fieldValue !== value
    case 'gt':
      return (fieldValue as number) > (value as number)
    case 'gte':
      return (fieldValue as number) >= (value as number)
    case 'lt':
      return (fieldValue as number) < (value as number)
    case 'lte':
      return (fieldValue as number) <= (value as number)
    case 'in':
      return (fieldValue as string[])?.includes?.(value as string)
    case 'nin':
      return !(fieldValue as string[])?.includes?.(value as string)
    case 'empty':
      return isEmpty(fieldValue)
    case 'notempty':
      return !isEmpty(fieldValue)
    default:
      return value === fieldValue
  }
}

export default checkComparison
