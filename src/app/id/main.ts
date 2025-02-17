import { nanoid } from 'nanoid'

import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'
import copyToClipboard from '@/src/utils/copy-to-clipboard'
import uuid from '@/src/utils/uuid'

const ID_CONFIG = {
  nanoid,
  uuid,
} as const

const generateIdAndCopy = async (type: keyof typeof ID_CONFIG) => {
  const result = ID_CONFIG[type as keyof typeof ID_CONFIG]()
  logger.info(result)
  await copyToClipboard(result)
  logger.info('copy!')
}

const main = async () => {
  const [, , _frag] = process.argv
  const frag = _frag?.replace('--', '')?.toLowerCase()

  const idConfigList = Object.keys(ID_CONFIG).map(item => item.toLowerCase())

  if (idConfigList.includes(frag)) {
    generateIdAndCopy(frag as keyof typeof ID_CONFIG)
    return
  }

  const type = await prompt('choose type', {
    type: 'select',
    options: ['nanoid', 'uuid'],
  })
  generateIdAndCopy(type as keyof typeof ID_CONFIG)
}

main()
