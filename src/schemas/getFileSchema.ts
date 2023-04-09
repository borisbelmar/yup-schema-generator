import { array, ArraySchema, number, object, string } from 'yup'
import type { FileDescriptor, ValidationObject } from '@/@types'
import getSchemaWithMinMax from '../utils/getSchemaWithMinMax'
import getSchemaWithRef from '../utils/getSchemaWithRef'
import getValue from '../utils/getValue'

const getFileSchema = (name: string, validation: ValidationObject) => {
  let schema = array().of(object().shape({
    name: string()
      .typeError(`File name must be a string in ${name}`)
      .required(`File name is required in ${name}`),
    size: number()
      .typeError(`File size must be a number in ${name}`)
      .required(`File size is required in ${name}`),
    type: string()
      .typeError(`File type must be a string in ${name}`)
      .required(`File type is required in ${name}`),
    url: string()
      .typeError(`File url must be a string in ${name}`)
      .url(`File url must be a valid url in ${name}`)
  })) as ArraySchema<FileDescriptor[], unknown, unknown>

  const {
    value: requiredValue,
    errorMessage: requiredErrorMessage
  } = getValue(validation, 'required')

  if (requiredValue) {
    schema = schema.required(
      requiredErrorMessage || `${name} is required`
    ).min(1, `${name} must have at least one file`)
  }

  schema = getSchemaWithMinMax(
    schema as ArraySchema<unknown[], undefined>,
    name,
    validation
  ) as unknown as ArraySchema<FileDescriptor[], unknown, unknown>

  schema = getSchemaWithRef(
    schema,
    name,
    validation
  ) as unknown as ArraySchema<FileDescriptor[], unknown, unknown>

  return schema
}

export default getFileSchema
