import { ApiResponse } from '@telepetros/core/responses'

export function handleNetworkError<Body>(error: unknown) {
  if (error instanceof Error) {
    return new ApiResponse({ error: error.message, statusCode: 500 }) as ApiResponse<Body>
  }
  return new ApiResponse({
    error: 'Api network error',
    statusCode: 500,
  }) as ApiResponse<Body>
}
