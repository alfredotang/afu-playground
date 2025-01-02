import { nanoid } from 'nanoid'

import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'
import copyToClipboard from '@/src/utils/copy-to-clipboard'
import uuid from '@/src/utils/uuid'

const ID_CONFIG = {
  nanoid,
  uuid,
}

const main = async () => {
  const type = await prompt(' ', {
    type: 'select',
    options: ['nanoid', 'uuid'],
  })
  const result = ID_CONFIG[type as keyof typeof ID_CONFIG]()
  logger.info(result)
  await copyToClipboard(result)
  logger.info('copy!')
}

main()
