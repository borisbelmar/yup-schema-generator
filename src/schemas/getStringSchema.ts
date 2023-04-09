import { string } from 'yup'
import type { StringSchema } from 'yup'
import { ValidationObject } from '@/@types'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getSchemaWithMinMax from '../utils/getSchemaWithMinMax'
import getValue from '../utils/getValue'
import getSchemaWithOneOf from '../utils/getSchemaWithOneOf'
import getSchemaWithConditionalTest from '../utils/getSchemaWithConditionalTest'
import getSchemaWithRef from '../utils/getSchemaWithRef'

const getStringSchema = (name: string, validation: ValidationObject) => {
  let schema = string().typeError(`${name} must be a string`)

  schema = getSchemaWithRequired(schema, name, validation) as StringSchema
  schema = getSchemaWithMinMax(schema, name, validation) as StringSchema
  schema = getSchemaWithOneOf(schema, name, validation) as StringSchema
  schema = getSchemaWithRef(schema, name, validation) as StringSchema

  const {
    value: emailValue,
    errorMessage: emailErrorMessage,
    conditions: emailConditions
  } = getValue(validation, 'email', true)

  if (emailConditions?.length) {
    schema = getSchemaWithConditionalTest({
      field: 'email',
      schema,
      conditions: emailConditions,
      validator: value => (emailValue ? schema.email(emailErrorMessage || `${name} must be a valid email`).isValidSync(value) : true),
      errorMessage: emailErrorMessage || `${name} must be a valid email`
    }) as StringSchema
  } else if (emailValue) {
    schema = schema.email(emailErrorMessage || `${name} must be a valid email`)
  }

  const {
    value: uriValue,
    errorMessage: uriErrorMessage,
    conditions: uriConditions
  } = getValue(validation, 'uri', true)

  if (uriConditions?.length) {
    schema = getSchemaWithConditionalTest({
      field: 'url',
      schema,
      conditions: uriConditions,
      validator: value => (uriValue ? schema.url(uriErrorMessage || `${name} must be a valid url`).isValidSync(value) : true),
      errorMessage: uriErrorMessage || `${name} must be a valid url`
    }) as StringSchema
  } else if (uriValue) {
    schema = schema.url(uriErrorMessage || `${name} must be a valid url`)
  }

  const {
    value: patternValue,
    errorMessage: patternErrorMessage,
    conditions: patternConditions
  } = getValue<string>(validation, 'pattern')

  if (patternConditions?.length) {
    schema = getSchemaWithConditionalTest({
      field: 'matches',
      schema,
      conditions: patternConditions,
      validator: value => (patternValue ? schema.matches(new RegExp(patternValue), patternErrorMessage || `${name} must match the pattern "${patternValue}"`).isValidSync(value) : true),
      errorMessage: patternErrorMessage || `${name} must match the pattern "${patternValue}"`
    }) as StringSchema
  } else if (patternValue) {
    schema = schema.matches(new RegExp(patternValue), patternErrorMessage || `${name} must match the pattern "${patternValue}"`)
  }

  return schema
}

export default getStringSchema
