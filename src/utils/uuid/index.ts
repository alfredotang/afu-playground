import { customAlphabet } from 'nanoid'

const alphanumericalId = customAlphabet('1234567890abcdef', 8)

const uuid = () =>
  `${alphanumericalId(8)}-${alphanumericalId(4)}-${alphanumericalId(4)}-${alphanumericalId(4)}-${alphanumericalId(12)}`

export default uuid
