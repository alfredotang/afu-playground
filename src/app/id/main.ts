import { nanoid } from 'nanoid'
import { v4 as uuid } from 'uuid'
import prompt from '@src/libs/prompt'
import logger from '@src/libs/logger'

const ID_CONFIG = {
  nanoid,
  uuid,
}

const main = async () => {
  const type = await prompt(' ', { type: 'select', options: ['nanoid', 'uuid'] })
  const result = ID_CONFIG[type as keyof typeof ID_CONFIG]()
  logger.info(result)
}

main()
