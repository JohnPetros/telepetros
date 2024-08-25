import { isAxiosError } from 'axios'

import { ApiResponse } from '@telepetros/core/responses'

export function handleAxiosError<ResponseBody>(axiosError: unknown) {
  if (isAxiosError(axiosError)) {
    console.log(`Axios Error: ${axiosError}`)
    return new ApiResponse({
      body: axiosError.message,
      statusCode: axiosError.response?.status,
    }) as ApiResponse<ResponseBody>
  }

  console.log(`Unknown Error: ${axiosError}`)
  return new ApiResponse({
    body: 'Unknown error',
    statusCode: 500,
  }) as ApiResponse<ResponseBody>
}
