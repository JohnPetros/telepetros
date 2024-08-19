import { HttpReponse } from '@telepetros/core/responses'

export function handleNextApiError<Body>(error: unknown, statusCode: number) {
  if (error instanceof Error) {
    console.error(`Next Api Error: ${error.message}`)
    return new HttpReponse({ body: error.message, statusCode }) as HttpReponse<Body>
  }
  return new HttpReponse({
    body: 'Unknown api error',
    statusCode,
  }) as HttpReponse<Body>
}
