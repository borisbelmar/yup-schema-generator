import { Schema } from 'yup'
import { Condition } from '@/@types'
import conditionalTest from './conditionalTest'

export interface GetSchemaWithConditionalTestProps {
  field: string
  schema: Schema
  conditions: Condition[] | undefined
  validator: (value: unknown) => boolean
  errorMessage: string
}

export default function getSchemaWithConditionalTest({
  field,
  schema,
  conditions,
  validator,
  errorMessage
}: GetSchemaWithConditionalTestProps) {
  if (!conditions || conditions.length === 0) {
    return schema
  }

  let baseSchema = schema
  baseSchema = baseSchema.test({
    name: field,
    test: conditionalTest({
      conditions,
      validator
    }),
    exclusive: true,
    message: errorMessage
  })

  return baseSchema
}
