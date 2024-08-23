import { HttpReponse } from '@telepetros/core/responses'

export function handleApiError<Body>(error: object, statusCode: number) {
  if ('title' in error && 'message' in error) {
    console.error(`Error title: ${error.title}`)
    console.error(`Error message: ${error.message}`)
    return new HttpReponse({ body: error.message, statusCode }) as HttpReponse<Body>
  }

  return new HttpReponse({
    body: 'Unknown api error',
    statusCode,
  }) as HttpReponse<Body>
}
