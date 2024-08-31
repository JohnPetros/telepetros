import { isAxiosError } from 'axios'

import { ApiResponse } from '@telepetros/core/responses'

export function handleAxiosError<ResponseBody>(axiosError: unknown) {
  if (isAxiosError(axiosError)) {
    console.log('Axios Error: ')
    console.log(axiosError.response?.data)
    return new ApiResponse({
      errorMessage: axiosError.message,
      statusCode: axiosError.response?.status,
    }) as ApiResponse<ResponseBody>
  }

  console.log(`Unknown Error: ${axiosError}`)
  return new ApiResponse({
    errorMessage: 'Unknown error',
    statusCode: 500,
  }) as ApiResponse<ResponseBody>
}
