import { TestContext } from 'yup'
import { Condition } from '@/@types'
import checkConditions from './checkConditions'

export interface ConditionalTestProps {
  conditions: Condition[]
  validator: (value: unknown) => boolean
}

export default function conditionalTest({ conditions, validator }: ConditionalTestProps) {
  return function testFn(this: TestContext, value: unknown) {
    const { parent } = this
    const result = checkConditions({
      conditions,
      parent
    })

    if (result) {
      return validator(value)
    }

    return true
  }
}
