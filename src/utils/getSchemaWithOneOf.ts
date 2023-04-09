import { Schema } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithConditionalTest from './getSchemaWithConditionalTest'
import getValue from './getValue'

const getSchemaWithOneOf = <T extends Schema>(
  schema: T,
  name: string,
  validation: ValidationObject
) => {
  let localSchema = schema

  const {
    value: oneOfValue,
    errorMessage: oneOfErrorMessage,
    conditions: oneOfConditions
  } = getValue<unknown[]>(validation, 'oneOf')

  if (oneOfConditions?.length) {
    localSchema = getSchemaWithConditionalTest({
      field: 'is',
      schema: localSchema,
      conditions: oneOfConditions,
      validator: value => (oneOfValue ? schema.is(oneOfValue).isValidSync(value) : true),
      errorMessage: oneOfErrorMessage || `${name} must be one of ${oneOfValue?.join(', ')}`
    }) as T
  } else if (oneOfValue) {
    localSchema = localSchema.is(oneOfValue, oneOfErrorMessage || `${name} must be one of ${oneOfValue?.join(', ')}`) as T
  }

  return localSchema
}

export default getSchemaWithOneOf
