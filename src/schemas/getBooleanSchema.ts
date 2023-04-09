import { boolean } from 'yup'
import type { BooleanSchema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getSchemaWithRef from '../utils/getSchemaWithRef'
import getSchemaWithOneOf from '../utils/getSchemaWithOneOf'

const getBooleanSchema = (name: string, validation: ValidationObject) => {
  let schema = boolean().typeError(`${name} must be a boolean`)

  schema = getSchemaWithRequired(schema, name, validation) as BooleanSchema
  schema = getSchemaWithRef(schema, name, validation) as BooleanSchema
  schema = getSchemaWithOneOf(schema, name, validation) as BooleanSchema

  return schema
}

export default getBooleanSchema
