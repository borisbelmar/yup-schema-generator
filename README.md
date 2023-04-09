# Yup Schema Generator

[![codecov](https://codecov.io/gh/borisbelmar/yup-schema-generator/branch/main/graph/badge.svg?token=7G8O21M6C3)](https://codecov.io/gh/borisbelmar/yup-schema-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate Yup schemas from JSON Schema.

## Installation

```bash
npm install @borisbelmar/yup-schema-generator

# or

yarn add @borisbelmar/yup-schema-generator
```

## Basic Usage

```js
import { generateYupSchema } from 'yup-schema-generator';

const schema = generateYupSchema({
  name: {
    type: 'string',
    required: true
  },
  age: {
    type: 'number',
    required: true,
    min: {
      value: 18,
      errorMessage: 'You must be at least 18 years old'
    }
  }
})

schema.isValid({
  name: 'John',
  age: 30,
}).then((valid) => {
  console.log(valid) // true
})

schema.isValid({
  name: 'John',
  age: 10,
}).catch((err) => {
  console.log(err) // ValidationError: You must be at least 18 years old
})
```
