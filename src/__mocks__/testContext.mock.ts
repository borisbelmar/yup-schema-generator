import { TestContext } from 'yup'

const mockTestContext: TestContext = {
  path: '',
  options: {},
  parent: {
    a: 1,
    b: 2,
    c: 3
  },
  originalValue: {},
  resolve: () => ({}) as never,
  schema: {},
  createError: () => ({}) as never
}

export default mockTestContext
