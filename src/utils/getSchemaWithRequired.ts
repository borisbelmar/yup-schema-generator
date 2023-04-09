import { Schema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithConditionalTest from './getSchemaWithConditionalTest'
import getValue from './getValue'

const getSchemaWithRequired = (schema: Schema, name: string, validation: ValidationObject) => {
  const {
    value: requiredValue,
    errorMessage: requiredErrorMessage,
    conditions: requiredConditions
  } = getValue<boolean>(validation, 'required', true)

  let baseSchema = schema

  if (requiredConditions?.length) {
    baseSchema = getSchemaWithConditionalTest({
      field: 'required',
      schema: baseSchema,
      conditions: requiredConditions,
      validator: value => (requiredValue ? schema.required().isValidSync(value) : true),
      errorMessage: requiredErrorMessage || `${name} is required`
    })
  } else if (requiredValue) {
    baseSchema = baseSchema.required(
      requiredErrorMessage || `${name} is required`
    )
  }

  return baseSchema
}

export default getSchemaWithRequired
