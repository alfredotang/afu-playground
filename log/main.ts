type FieldResolver<T, F extends keyof T | Array<keyof T>> = F extends keyof T
  ? T[F]
  : F extends Array<infer U>
  ? U extends keyof T
    ? T[U]
    : never
  : never

// type ValueFormatter<T, F extends keyof T | Array<keyof T>> =

interface TableColumn<T> {
  field: keyof T | Array<keyof T>
  valueFormatter: <F extends keyof T | Array<keyof T>>(value: FieldResolver<T, F>, rowData: T) => void
}

interface RowData {
  id: number
  name: string
  age: number
}
