import { array } from 'yup'
import type { ArraySchema as YupArraySchema } from 'yup'
import type { ValidationObject } from '@/@types'
import getSchemaWithMinMax from '../utils/getSchemaWithMinMax'
import getSchemaWithRequired from '../utils/getSchemaWithRequired'
import getSchemaWithRef from '../utils/getSchemaWithRef'

const getArraySchema = (name: string, validation: ValidationObject) => {
  type ArraySchema = YupArraySchema<unknown[] | undefined, unknown>
  let schema: ArraySchema = array().typeError(`${name} must be an array`)

  schema = getSchemaWithRequired(schema, name, validation) as unknown as ArraySchema
  schema = getSchemaWithMinMax(schema, name, validation) as ArraySchema
  schema = getSchemaWithRef(schema, name, validation) as ArraySchema

  return schema
}

export default getArraySchema
