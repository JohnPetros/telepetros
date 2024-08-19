import { HttpReponse } from '@telepetros/core/responses'

export function handleNextApiError<Body>(error: unknown) {
  if (error instanceof Error) {
    console.error(`Next Api Error: ${error.message}`)
    return new HttpReponse({ body: error.message, statusCode: 500 }) as HttpReponse<Body>
  }
  return new HttpReponse({
    body: 'Unknown api error',
    statusCode: 500,
  }) as HttpReponse<Body>
}
