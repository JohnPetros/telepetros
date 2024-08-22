import { AppError } from '../errors'

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
    if (this._error) throw new this._error()
  }

  get errorMessage() {
    if (!this._error) throw new AppError('Service response is not failure')

    const error = new this._error()
    console.log(error)
    return error.message
  }

  get isSuccess() {
    return this._error === null
  }

  get isFailure() {
    return this._error !== null
  }

  get data(): Data {
    if (this._data === null) {
      throw new AppError('Service response is failure')
    }

    return this._data
  }
}
