'use client'

import { type RefObject, useState } from 'react'

import type { ChannelDto } from '@telepetros/core/dtos'

import type { PopoverRef } from '@/ui/components/shared/popover/types'
import { CACHE } from '@/ui/constants/cache'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { useCache, useToast, useNavigation, useApi } from '@/ui/hooks'
import { ROUTES } from '@/ui/constants'

type Tab = 'channels' | 'chatters'

export function useChatTabs(popoverRef: RefObject<PopoverRef>) {
  const [selectedTab, setSelectedTab] = useState<Tab>('channels')
  const { channelsService, chattersService, uploadService } = useApi()
  const { chatter } = useAuthContext()
  const { navigateTo } = useNavigation()
  const toast = useToast()

  async function fetchChannels() {
    if (!chatter) return

    const response = await channelsService.fetchChannelsListByChatter(chatter.id)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
    }

    return response.body
  }

  async function fetchChatters() {
    if (!chatter) return

    const response = await chattersService.fetchChattersListByChatter(chatter.id)

    if (response.isFailure) {
      console.log(response.errorMessage)
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

  async function updateChannelsCache(channelDto: ChannelDto) {
    if (!channels) return

    await mutateChannelsCache([...channels, channelDto])
  }

  async function handleCreateChannel(channelName: string, channelAvatarFile: File) {
    if (!chatter || !channels) return

    popoverRef.current?.close()

    const uploadResponse = await uploadService.saveImage('avatar', channelAvatarFile)

    if (uploadResponse.isFailure) {
      toast.showError(uploadResponse.errorMessage)
      return
    }

    const avatar = uploadResponse.body.imageUrl

    const channelResponse = await channelsService.createChannel(
      channelName,
      avatar,
      chatter.id,
    )

    if (channelResponse.isSuccess) {
      const createdChannel = channelResponse.body
      await updateChannelsCache(createdChannel)
      navigateTo(`${ROUTES.channel}/${createdChannel.id}/chat`)
      return
    }
  }

  async function handleJoinChannel(inviteCode: string) {
    const response = await channelsService.joinChannel(inviteCode)

    popoverRef.current?.close()

    if (response.isFailure) {
      toast.showError(response.errorMessage)
      return
    }

    if (response.isSuccess) {
      const joinedChannel = response.body
      await updateChannelsCache(joinedChannel)
      navigateTo(`${ROUTES.channel}/${joinedChannel.id}/chat`)
    }
  }

  return {
    channels,
    chatters,
    selectedTab,
    handleCreateChannel,
    handleJoinChannel,
    handleTabChange,
  }
}
