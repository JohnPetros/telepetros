import { HTTP_STATUS_CODE } from '#constants'
import { AppError } from '../errors'
import { ApiError } from '../errors/global'

type ApiResponseProps<Body> = {
  body?: Body
  statusCode?: number
  error?: string
}

export class ApiResponse<Body> {
  private readonly _body: Body | null
  private readonly _statusCode: number
  private readonly _error: string | null

  constructor({ body, statusCode, error }: ApiResponseProps<Body>) {
    this._body = body ?? null
    this._statusCode = statusCode ?? HTTP_STATUS_CODE.ok
    this._error = error ?? null
  }

  throwError() {
    throw new ApiError(this.error, this.statusCode)
  }

  get isSuccess() {
    return this.statusCode <= HTTP_STATUS_CODE.badRequest
  }

  get isFailure() {
    return this.statusCode >= HTTP_STATUS_CODE.badRequest
  }

  get body(): Body {
    if (this._body === null) {
      throw new AppError('Api response error', 'Response is an error')
    }

    return this._body
  }

  get statusCode(): number {
    return this._statusCode
  }

  get error(): string {
    if (!this._error) {
      throw new AppError('Api response error', 'Response is not an error')
    }

    return this._error
  }
}
