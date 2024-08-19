import type { AppError } from '../errors'

type ServiceResponseProps<Data> = {
  data?: Data
  error?: typeof AppError
}

export class ServiceResponse<Data = null> {
  private readonly _data: Data | null
  private readonly _error: typeof AppError | null

  constructor({ data, error }: ServiceResponseProps<Data>) {
    this._data = data ?? null
    this._error = error ?? null
  }

  throwError() {
    if (this._error) new this._error()
  }

  get isSuccess() {
    return this._error === null
  }

  get isFailure() {
    return this._error !== null
  }

  get data(): Data {
    if (this._data === null) {
      throw new Error('Service response is error')
    }

    return this._data
  }
}
