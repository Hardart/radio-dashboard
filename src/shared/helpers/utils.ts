export type ObjectItem = Record<string, any>

export const isType = <Type>(thing: any): thing is Type => true

export function isArrayOfType<A>(
  input: unknown,
  typeCheck: (inputItem: unknown) => inputItem is A
): input is A[] {
  return isArray(input) && input.every(typeCheck)
}

export function isArray(input: unknown): input is any[] {
  return Array.isArray(input)
}

export function isObject(input: unknown): input is ObjectItem {
  return typeof input === 'object' && input !== null && !isArray(input)
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
  if (!src) throw new Error('can_t correct local URL')
  return import.meta.env.DEV ? 'https://radioshtani.ru' + src : src
}

export function correctLocalImageUrl(src: string | undefined) {
  if (!src) throw new Error('can_t correct local URL')
  return import.meta.env.DEV ? 'http://localhost:3068/images/home' + src : src
}

export function removeLocalUrl(src: string | undefined) {
  if (!src) throw new Error('can_t remove local URL')
  return src.replace('http://localhost:3068/images/home', '')
}

export const createArrayOfNumbers = (count: number, startFrom: number = 0) =>
  new Array(count).fill('').map((_, index) => index + startFrom)

export function _clamp(min: number, max: number, curr: number) {
  return Math.max(min, Math.min(max, curr))
}

export function replaceOriginalImage(src: string | undefined, quality: number) {
  const correctSrc = correctImageUrl(src)
  return correctSrc.replace('orig', `${quality}`)
}
enum ImageQuality {
  'xs' = '350x150',
  'sm' = '420x180',
  'md' = '624x267',
}
export function replaceGalleryImage(
  src: string | undefined,
  quality: keyof typeof ImageQuality = 'xs'
) {
  const correctSrc = correctImageUrl(src)
  return correctSrc.replace('1536x658', `${ImageQuality[quality]}`)
}
