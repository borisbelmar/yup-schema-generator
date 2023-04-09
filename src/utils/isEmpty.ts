export default function isEmpty(value: unknown): boolean {
  return (
    value === null
    || value === undefined
    || (typeof value === 'string' && value.trim() === '')
    || (Array.isArray(value) && value.length === 0)
    || (typeof value === 'object' && value !== null && Object.keys(value as object).length === 0)
  )
}
