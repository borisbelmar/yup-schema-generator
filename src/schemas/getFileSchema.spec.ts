import { ValidationError } from 'yup'
import { FileDescriptor } from '@/@types'
import getFileSchema from './getFileSchema'

describe('getFileSchema', () => {
  const name = 'TestName'
  const validFile: FileDescriptor = {
    name: 'test-file.txt',
    size: 1024,
    type: 'text/plain',
    url: 'https://example.com/test-file.txt'
  }

  it('should validate a valid file object array', async () => {
    const schema = getFileSchema(name, {})
    const validFileArray = [validFile]

    await expect(schema.validate(validFileArray)).resolves.toEqual(validFileArray)
  })

  it('should check if required', async () => {
    const schema = getFileSchema(name, { required: true })

    await expect(schema.validate([])).rejects.toThrow(`${name} must have at least one file`)
    await expect(schema.validate(undefined)).rejects.toThrow(`${name} is required`)
  })

  it('should check for required properties', async () => {
    const schema = getFileSchema(name, { required: true })

    await expect(schema.validate([{}])).rejects.toThrowError(ValidationError)
  })

  it('should check for correct types', () => {
    const schema = getFileSchema(name, {})

    const invalidFile = { ...validFile }

    invalidFile.name = undefined as unknown as string
    expect(() => schema.validateSync([invalidFile])).toThrow(`File name is required in ${name}`)

    invalidFile.name = validFile.name as unknown as string
    invalidFile.size = 'asd' as unknown as number
    expect(() => schema.validateSync([invalidFile])).toThrow(`File size must be a number in ${name}`)

    invalidFile.type = validFile.type
    invalidFile.url = 'invalid-url'
    expect(() => schema.validateSync([invalidFile])).toThrow(`File url must be a valid url in ${name}`)
  })

  it('should check for min and max', async () => {
    const schema = getFileSchema(name, { min: 2, max: 3 })

    await expect(schema.validate([validFile, validFile]))
      .resolves.toEqual([validFile, validFile])
    await expect(schema.validate([validFile, validFile, validFile]))
      .resolves.toEqual([validFile, validFile, validFile])
    await expect(schema.validate([validFile, validFile, validFile, validFile]))
      .rejects.toThrow(`${name} must be at most 3`)
    await expect(schema.validate([validFile]))
      .rejects.toThrow(`${name} must be at least 2`)
  })
})
