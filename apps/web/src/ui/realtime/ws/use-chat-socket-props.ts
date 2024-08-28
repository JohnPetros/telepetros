import type { RealtimeResponse } from '@telepetros/core/responses'

export type UseChatSocketProps = {
  url: string
  onResponse: (response: RealtimeResponse<any>) => void
  onError?: VoidFunction
  onOpen?: VoidFunction
}
