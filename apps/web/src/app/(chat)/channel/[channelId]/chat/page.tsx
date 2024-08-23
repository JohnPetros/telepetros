import { ChannelChatPage } from '@/ui/components/pages/channel-chat'

type PageProps = {
  params: {
    channelId: string
  }
}

const Page = ({ params }: PageProps) => {
  return <ChannelChatPage channelId={params.channelId} />
}

export default Page
