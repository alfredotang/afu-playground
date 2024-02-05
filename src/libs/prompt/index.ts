import type { ConsolaInstance } from 'consola'
import { consola } from 'consola'

export type PromptParams = Parameters<ConsolaInstance['prompt']>
export type PromptOptions = NonNullable<PromptParams[1]>
export type PromptResult<T> = T extends { type: 'text' }
  ? string
  : T extends { type: 'confirm' }
    ? boolean
    : T extends { type: 'select' }
      ? string
      : string[]

const prompt = async <T extends PromptOptions>(message: string, options: T) => {
  const result = await consola.prompt<T>(message, options)
  if (typeof result === 'symbol') {
    consola.info('cancel the process')
    process.exit(0)
  }
  return result as unknown as PromptResult<T>
}

export default prompt
