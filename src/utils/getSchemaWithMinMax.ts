import { ArraySchema, NumberSchema, ref, StringSchema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithConditionalTest from './getSchemaWithConditionalTest'
import getValue from './getValue'

const getSchemaWithMinMax = (
  schema: ArraySchema<unknown[] | undefined, unknown> | StringSchema | NumberSchema,
  name: string,
  validation: ValidationObject
) => {
  let localSchema = schema

  const {
    value: minValue,
    errorMessage: minErrorMessage,
    conditions: minConditions,
    ref: minRef
  } = getValue<number>(validation, 'min')

  if (minConditions?.length) {
    localSchema = getSchemaWithConditionalTest({
      field: 'min',
      schema: localSchema,
      conditions: minConditions,
      validator: value => (minValue ? schema.min(minValue).isValidSync(value) : true),
      errorMessage: minErrorMessage || `${name} must be at least ${minValue}`
    }) as ArraySchema<unknown[] | undefined, unknown> | StringSchema | NumberSchema
  } else if (minValue) {
    localSchema = localSchema.min(minValue, minErrorMessage || `${name} must be at least ${minValue}`)
  } else if (minRef) {
    localSchema = localSchema.min(ref(minRef), minErrorMessage || `${name} must be at least ${minRef} value`)
  }

  const {
    value: maxValue,
    errorMessage: maxErrorMessage,
    conditions: maxConditions,
    ref: maxRef
  } = getValue<number>(validation, 'max')

  if (maxConditions) {
    localSchema = getSchemaWithConditionalTest({
      field: 'max',
      schema: localSchema,
      conditions: maxConditions,
      validator: value => (maxValue ? schema.max(maxValue).isValidSync(value) : true),
      errorMessage: maxErrorMessage || `${name} must be at most ${maxValue}`
    }) as ArraySchema<unknown[] | undefined, unknown> | StringSchema | NumberSchema
  } else if (maxValue) {
    localSchema = localSchema.max(maxValue, maxErrorMessage || `${name} must be at most ${maxValue}`)
  } else if (maxRef) {
    localSchema = localSchema.max(ref(maxRef), maxErrorMessage || `${name} must be at least ${maxRef} value`)
  }

  return localSchema
}

export default getSchemaWithMinMax
