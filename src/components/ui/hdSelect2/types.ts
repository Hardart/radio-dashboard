export type SelectProps<T> =
  | (
      | {
          options: string[]
          keyAttr?: never
          labelAttr?: never
        }
      | {
          options: T[]
          keyAttr?: keyof T
          labelAttr?: keyof T
        }
    ) & { placeholder?: string; multiple?: boolean; full?: boolean }
