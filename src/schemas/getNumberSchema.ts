import { number } from 'yup'
import type { NumberSchema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithMinMax from '../utils/getSchemaWithMinMax'
import getSchemaWithOneOf from '../utils/getSchemaWithOneOf'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getSchemaWithRef from '../utils/getSchemaWithRef'

const getNumberSchema = (name: string, validation: ValidationObject) => {
  let schema = number().typeError(`${name} must be a number`)

  schema = getSchemaWithRequired(schema, name, validation) as NumberSchema
  schema = getSchemaWithMinMax(schema, name, validation) as NumberSchema
  schema = getSchemaWithOneOf(schema, name, validation) as NumberSchema
  schema = getSchemaWithRef(schema, name, validation) as NumberSchema

  return schema
}

export default getNumberSchema
