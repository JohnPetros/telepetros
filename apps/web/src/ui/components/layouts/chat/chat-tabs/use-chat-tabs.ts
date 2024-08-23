'use client'

import { useState } from 'react'

import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { useCache } from '@/ui/hooks/use-cache'

type Tab = 'channels' | 'chatters'

export function useChatTabs() {
  const [selectedTab, setSelectedTab] = useState<Tab>('channels')
  const { channelsService, chattersService } = useApi()
  const { chatter } = useAuthContext()

  async function fetchChannels() {
    if (!chatter) return

    const response = await channelsService.listChannelsByChatter(chatter.id)

    if (response.isFailure) {
      console.log(response.errorMessage)
    }
    return response.data
  }

  async function fetchChatters() {
    if (!chatter) return

    const response = await chattersService.listChattersByChatter(chatter.id)

    if (response.isFailure) {
      console.log(response.errorMessage)
    }
    return response.data
  }

  function handleTabChange(tab: string) {
    setSelectedTab(tab as Tab)
  }

  const { data: channels } = useCache({
    key: CACHE.channelsList.key,
    fetcher: fetchChannels,
  })
  const { data: chatters } = useCache({
    key: CACHE.chattersList.key,
    fetcher: fetchChatters,
  })

  async function handleCreateChannel(channelName: string) {
    if (!chatter) return

    const response = await channelsService.createChannel(channelName, chatter.id)

    console.log(response)

    if (response.isSuccess) {
      console.log({ createdChannelDto: response.data })
      return
    }
  }

  return {
    channels,
    chatters,
    selectedTab,
    handleCreateChannel,
    handleTabChange,
  }
}
