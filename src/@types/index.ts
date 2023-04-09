import type { Schema } from 'yup'

export type Type = 'string' | 'number' | 'boolean' | 'json' | 'array' | 'date' | 'file'

export interface Option {
  value: unknown
  label: string
  helpText?: string
}

export interface FileDescriptor {
  name: string
  size: number
  type: string
  file?: File
  url?: string
}

export type Condition = {
  field: string
  value?: unknown
  compare?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'empty' | 'notempty'
  operator?: 'and' | 'or'
}

export type ValidationValue<T = unknown> = {
  value?: T
  ref?: string
  errorMessage?: string
  conditions?: Condition[]
}

export interface ValidationObject {
  required?: ValidationValue<boolean> | boolean
  min?: ValidationValue<number | string> | number | string
  max?: ValidationValue<number | string> | number | string
  email?: ValidationValue<boolean> | boolean
  uri?: ValidationValue<boolean> | boolean
  pattern?: ValidationValue<string> | string
  oneOf?: ValidationValue<string[] | number[] | boolean[]> | string[] | number[] | boolean[]
  ref?: ValidationValue<string> | string
}

export interface ValidationObjectWithType extends ValidationObject {
  type: Type
}

export type SchemaValidator = (
  name: string,
  validation: ValidationObject
) => Schema
