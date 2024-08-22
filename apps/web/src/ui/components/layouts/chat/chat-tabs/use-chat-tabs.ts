'use client'

import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { useCache } from '@/ui/hooks/use-cache'
import { useState } from 'react'

type Tab = 'channels' | 'chatters'

export function useChatTabs() {
  const [selectedTab, setSelectedTab] = useState<Tab>('channels')
  const { channelsService } = useApi()
  const { chatter } = useAuthContext()

  async function fetchChannels() {
    if (!chatter) return

    const response = await channelsService.listChannelsByChatter(chatter.id)

    if (response.isFailure) {
      console.log(response.errorMessage)
    }
    return response.data
  }

  function handleTabChange(tab: string) {
    setSelectedTab(tab as Tab)
  }

  const { data: channels } = useCache({ key: CACHE.channels.key, fetcher: fetchChannels })

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
    selectedTab,
    handleCreateChannel,
    handleTabChange,
  }
}
