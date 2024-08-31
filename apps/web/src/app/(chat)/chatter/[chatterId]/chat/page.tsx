import { notFound } from 'next/navigation'

import { ServerNextApiClient } from '@/infra/api/next'
import { ChattersService } from '@/infra/api/services'
import { ChatterChatPage } from '@/ui/components/pages/chatter-chat'

type PageProps = {
  params: {
    chatterId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const apiClient = ServerNextApiClient()
  const chattersService = ChattersService(apiClient)
  const response = await chattersService.fetchChatterChat(params.chatterId)

  if (response.isFailure) return notFound()

  return (
    <ChatterChatPage chatDto={response.body.chat} chatterDto={response.body.chatter} />
  )
}

export default Page
