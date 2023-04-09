import { ValidationObject } from '@/@types'

const validationObjectMock: ValidationObject = {
  required: true,
  min: { value: 0, errorMessage: 'Value must be greater than or equal to 0' },
  max: { value: 100 },
  email: { value: true, errorMessage: 'Invalid email address' },
  uri: { value: true, errorMessage: 'Invalid URI' },
  pattern: { value: '/^abc$/', errorMessage: 'Value must match the pattern /^abc$/' },
  oneOf: { value: [1, 2, 3], errorMessage: 'Value must be one of [1, 2, 3]' },
  ref: { value: 'password', errorMessage: 'Value must match the password field' }
}

export default validationObjectMock
