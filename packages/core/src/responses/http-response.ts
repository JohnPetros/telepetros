import { HTTP_STATUS_CODE } from '#constants'

type HttpResponseProps<Body> = {
  body?: Body
  statusCode?: number
}

export class HttpReponse<Body> {
  private readonly _body: Body | null
  private readonly _statusCode: number

  constructor({ body, statusCode }: HttpResponseProps<Body>) {
    this._body = body ?? null
    this._statusCode = statusCode ?? HTTP_STATUS_CODE.ok
  }

  get isError() {
    return this.statusCode >= HTTP_STATUS_CODE.serverError
  }

  get body(): Body {
    if (this._body === null) {
      throw new Error('Http response is error')
    }

    return this._body
  }

  get statusCode(): number {
    return this._statusCode
  }

  get errorMessage(): string {
    return String(this.body)
  }
}
