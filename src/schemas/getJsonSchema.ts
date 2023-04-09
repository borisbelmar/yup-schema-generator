import { object } from 'yup'
import type { ObjectSchema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getSchemaWithRef from '../utils/getSchemaWithRef'

const getJsonSchema = (name: string, validation: ValidationObject) => {
  let schema = object().json().typeError(`${name} must be a valid JSON string`)

  schema = getSchemaWithRequired(
    schema,
    name,
    validation
  ) as ObjectSchema<{ [x: string]: unknown }>

  schema = getSchemaWithRef(
    schema,
    name,
    validation
  ) as ObjectSchema<{ [x: string]: unknown }>

  return schema
}

export default getJsonSchema
