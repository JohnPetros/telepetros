import { ApiResponse } from '@telepetros/core/responses'

export function handleApiError<Body>(error: object, statusCode: number) {
  if ('title' in error && 'message' in error) {
    console.error(`Api error title: ${error.title}`)
    console.error(`Api error message: ${error.message}`)
    return new ApiResponse({ body: error.message, statusCode }) as ApiResponse<Body>
  }

  return new ApiResponse({
    body: 'Unknown api error',
    statusCode,
  }) as ApiResponse<Body>
}
