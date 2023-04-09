import { object } from 'yup'
import type {
  SchemaValidator,
  Type,
  ValidationObjectWithType,
  ValidationObject
} from '@/@types'
import {
  getArraySchema,
  getBooleanSchema,
  getDateSchema,
  getFileSchema,
  getJsonSchema,
  getNumberSchema,
  getStringSchema
} from './schemas'

const SCHEMAS_BY_TYPE: Record<Type, SchemaValidator> = {
  string: getStringSchema,
  number: getNumberSchema,
  boolean: getBooleanSchema,
  array: getArraySchema,
  json: getJsonSchema,
  date: getDateSchema,
  file: getFileSchema
}

const yupSchemaGenerator = (toValidate: Record<string, ValidationObjectWithType>) => {
  const schema = Object.entries(toValidate).reduce((acc, [key, value]) => {
    const schemaGenerator = SCHEMAS_BY_TYPE[value.type]
    if (!schemaGenerator) {
      return acc
    }
    return acc.shape({
      [key]: schemaGenerator(key, value)
    })
  }, object())
  return schema
}

export { default as checkConditions } from './utils/checkConditions'

export {
  yupSchemaGenerator,
  getStringSchema,
  getNumberSchema,
  getBooleanSchema,
  getArraySchema,
  getJsonSchema,
  getDateSchema,
  getFileSchema
}

export type {
  SchemaValidator,
  Type,
  ValidationObjectWithType,
  ValidationObject
}
