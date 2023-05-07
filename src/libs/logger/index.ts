import { consola } from 'consola'

class Logger {
  private _instance = consola

  public log = this._instance.log
  public start = this._instance.start
  public success = this._instance.success
  public info = this._instance.info
  public error = this._instance.error
}

export default new Logger()
