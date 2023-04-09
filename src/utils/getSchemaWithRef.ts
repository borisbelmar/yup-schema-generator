import { ref, Schema } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithConditionalTest from './getSchemaWithConditionalTest'
import getValue from './getValue'

export default function getSchemaWithRef(
  schema: Schema,
  name: string,
  validation: ValidationObject
) {
  const {
    value: refValue,
    errorMessage: refErrorMessage,
    conditions: refConditions
  } = getValue<string>(
    validation,
    'ref'
  )

  let baseSchema = schema

  if (refConditions?.length) {
    baseSchema = getSchemaWithConditionalTest({
      field: 'oneOf',
      schema: baseSchema,
      conditions: refConditions,
      validator: value => (refValue
        ? schema.oneOf([ref(refValue), null]).isValidSync(value)
        : true),
      errorMessage: refErrorMessage || `${name} must match ${refValue}`
    })
  } else if (refValue) {
    baseSchema = baseSchema.oneOf(
      [ref(refValue), null],
      refErrorMessage || `${name} must match ${refValue}`
    )
  }
  return baseSchema
}
