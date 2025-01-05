export type ObjectItem = Record<string, any>

export function isArray(input: unknown): input is any[] {
  return Array.isArray(input)
}
export function isObject(input: unknown): input is ObjectItem {
  return typeof input === 'object' && input !== null
}
export function isString(input: unknown): input is string {
  return typeof input === 'string'
}
export function isStringArray(value: unknown): value is string[] {
  return isArray(value) && value.every(isString)
}
export function isObjectArray(value: unknown): value is ObjectItem[] {
  return isArray(value) && value.every(isObject)
}
export function toString(value: unknown): string {
  return JSON.stringify(value)
}

export function correctImageUrl(src: string | undefined) {
  if (!src) return undefined
  return import.meta.env.DEV ? `http://localhost:3068/images/home${src}` : src
}

export function removeLocalUrl(src: string | undefined) {
  if (!src) return undefined
  return src.replace('http://localhost:3068/images/home', '')
}

export const createArrayOfNumbers = (count: number, startFrom: number = 0) =>
  new Array(count).fill('').map((_, index) => index + startFrom)
