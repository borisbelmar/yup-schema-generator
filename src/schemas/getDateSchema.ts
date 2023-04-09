import { date, ref } from 'yup'
import type { DateSchema } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getValue from '../utils/getValue'
import getSchemaWithConditionalTest from '../utils/getSchemaWithConditionalTest'
import getSchemaWithRef from '../utils/getSchemaWithRef'

const getDateSchema = (name: string, validation: ValidationObject) => {
  let schema = date().typeError(`${name} must be a date`)

  schema = getSchemaWithRequired(schema, name, validation) as DateSchema
  schema = getSchemaWithRef(schema, name, validation) as DateSchema

  const {
    value: minValue,
    errorMessage: minErrorMessage,
    conditions: minConditions,
    ref: minRef
  } = getValue<string>(validation, 'min')

  if (minConditions?.length) {
    schema = getSchemaWithConditionalTest({
      field: 'min',
      schema,
      conditions: minConditions,
      validator: value => (minValue ? schema.min(new Date(minValue)).isValidSync(value) : true),
      errorMessage: minErrorMessage || `${name} must be after ${minValue}`
    }) as DateSchema
  } else if (minValue) {
    schema = schema.min(new Date(minValue), minErrorMessage || `${name} must be after ${minValue}`)
  } else if (minRef) {
    schema = schema.min(ref(minRef, { map: value => new Date(value as string) }), minErrorMessage || `${name} must be after ${minRef} value`)
  }

  const {
    value: maxValue,
    errorMessage: maxErrorMessage,
    conditions: maxConditions,
    ref: maxRef
  } = getValue<string>(validation, 'max')

  if (maxConditions?.length) {
    schema = getSchemaWithConditionalTest({
      field: 'max',
      schema,
      conditions: maxConditions,
      validator: value => (maxValue ? schema.max(new Date(maxValue)).isValidSync(value) : true),
      errorMessage: maxErrorMessage || `${name} must be before ${maxValue}`
    }) as DateSchema
  } else if (maxValue) {
    schema = schema.max(new Date(maxValue), maxErrorMessage || `${name} must be before ${maxValue}`)
  } else if (maxRef) {
    schema = schema.max(ref(maxRef, { map: value => new Date(value as string) }), maxErrorMessage || `${name} must be after ${maxRef} value`)
  }

  return schema
}

export default getDateSchema
