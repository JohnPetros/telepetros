'use client'

import { useState } from 'react'

import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { useCache } from '@/ui/hooks/use-cache'
import { useNavigation } from '@/ui/hooks'
import { ROUTES } from '@/ui/constants'

type Tab = 'channels' | 'chatters'

export function useChatTabs() {
  const [selectedTab, setSelectedTab] = useState<Tab>('channels')
  const { channelsService, chattersService } = useApi()
  const { chatter } = useAuthContext()
  const { navigateTo } = useNavigation()

  async function fetchChannels() {
    if (!chatter) return

    const response = await channelsService.fetchChannelsListByChatter(chatter.id)

    if (response.isFailure) {
    }
    return response.body
  }

  async function fetchChatters() {
    if (!chatter) return

    const response = await chattersService.fetchChattersListByChatter(chatter.id)

    if (response.isFailure) {
      console.log(response.error)
    }
    return response.body
  }

  function handleTabChange(tab: string) {
    setSelectedTab(tab as Tab)
  }

  const { data: channels, mutateCache: mutateChannelsCache } = useCache({
    key: CACHE.channelsList.key,
    fetcher: fetchChannels,
  })
  const { data: chatters } = useCache({
    key: CACHE.chattersList.key,
    fetcher: fetchChatters,
  })

  async function handleCreateChannel(channelName: string) {
    if (!chatter || !channels) return

    const response = await channelsService.createChannel(channelName, chatter.id)

    if (response.isSuccess) {
      const createdChannel = response.body
      await mutateChannelsCache([...channels, createdChannel])
      navigateTo(`${ROUTES.channel}/${createdChannel.id}/chat`)
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
