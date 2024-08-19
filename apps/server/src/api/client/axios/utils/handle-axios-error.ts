import { isAxiosError } from 'axios'

import { HttpReponse } from '@telepetros/core/responses'

export function handleAxiosError<ResponseBody>(axiosError: unknown) {
  if (isAxiosError(axiosError)) {
    console.log(`Axios Error: ${axiosError}`)
    return new HttpReponse({
      body: axiosError.message,
      statusCode: axiosError.status,
    }) as HttpReponse<ResponseBody>
  }

  console.log(`Unknown Error: ${axiosError}`)
  return new HttpReponse({
    body: 'Unknown error',
    statusCode: 500,
  }) as HttpReponse<ResponseBody>
}
