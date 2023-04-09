import type { ValidationObject, ValidationValue } from '@/@types'

const KEYS = ['value', 'ref', 'errorMessage', 'condition']
const isValidationValueObj = <T>(validationValue: ValidationValue<T>) => Object
  .keys(validationValue)
  .some(key => (
    KEYS.includes(key)
  ))

const getValue = <T>(
  validation: ValidationObject,
  key: keyof ValidationObject,
  defaultValue?: T
) => {
  const validationValue = validation[key] as ValidationValue<T>
  const valueOnly = validation[key] as T
  const ref = validationValue?.ref
  const errorMessage = validationValue?.errorMessage
  const conditions = validationValue?.conditions

  let value: T | undefined

  if (validationValue === undefined || ref) {
    value = undefined
  } else if (isValidationValueObj(validationValue)) {
    value = validationValue?.value ?? defaultValue
  } else {
    value = valueOnly
  }

  return {
    value,
    errorMessage,
    conditions,
    ref
  }
}

export default getValue
