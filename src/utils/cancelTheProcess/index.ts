import logger from '@src/libs/logger'

const cancelTheProcess = (value: unknown, silent?: boolean) => {
  if (typeof value === 'symbol') {
    if (!silent) logger.info('cancel the process')
    return true
  }

  return false
}

export default cancelTheProcess
