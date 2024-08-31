import { notFound } from 'next/navigation'

import { ServerNextApiClient } from '@/infra/api/next'
import { ChattersService } from '@/infra/api/services'

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

  return <h1>Chatter Chat Page</h1>
}

export default Page
