import { ValidationError } from 'yup'
import { Type, ValidationObjectWithType } from '@/@types'
import { yupSchemaGenerator } from '.'

describe('yupSchemaGenerator', () => {
  const toValidate: Record<string, ValidationObjectWithType> = {
    name: {
      type: 'string',
      required: true,
      min: { value: 3 }
    },
    age: {
      type: 'number',
      required: true,
      min: { value: 18 }
    },
    email: {
      type: 'string',
      email: { value: true }
    }
  }

  const schema = yupSchemaGenerator(toValidate)

  it('should generate a schema that validates the provided object', async () => {
    const validObject = {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com'
    }

    await expect(schema.validate(validObject)).resolves.toEqual(validObject)
  })

  it('should generate a schema that invalidates objects with missing required fields', async () => {
    const invalidObject = {
      age: 25,
      email: 'john.doe@example.com'
    }

    await expect(schema.validate(invalidObject)).rejects.toThrow(ValidationError)
  })

  it('should generate a schema that invalidates objects with fields failing validation', async () => {
    const invalidObject = {
      name: 'Jo',
      age: 25,
      email: 'john.doe@example.com'
    }

    await expect(schema.validate(invalidObject)).rejects.toThrow(ValidationError)
  })

  it('should generate a schema that ignores unsupported types', async () => {
    const toValidateWithUnsupportedType: Record<string, ValidationObjectWithType> = {
      ...toValidate,
      unsupported: {
        type: 'unsupported' as Type,
        required: true
      }
    }

    const schemaWithUnsupportedType = yupSchemaGenerator(toValidateWithUnsupportedType)

    const validObject = {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com'
    }

    await expect(schemaWithUnsupportedType.validate(validObject)).resolves.toEqual(validObject)
  })
})
