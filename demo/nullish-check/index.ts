type Transformers = {
  req?: boolean
  res?: boolean
}

export const injectTransformer: Transformers | undefined = {}

export const defaultTransformer: Required<Transformers> = {
  req: false,
  res: false,
}

export const endpointTransformer: Transformers = {
  req: true,
}

export const d: Required<Transformers> = {
  res: false,
  req: false,
  ...injectTransformer,
}

console.log(d)
