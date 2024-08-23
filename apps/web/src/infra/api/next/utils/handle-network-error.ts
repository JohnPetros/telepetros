import { HttpReponse } from '@telepetros/core/responses'

export function handleNetworkError<Body>(error: unknown) {
  if (error instanceof Error) {
    return new HttpReponse({ body: error.message, statusCode: 500 }) as HttpReponse<Body>
  }
  return new HttpReponse({
    body: 'Api network error',
    statusCode: 500,
  }) as HttpReponse<Body>
}
