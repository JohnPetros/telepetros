import { useApi, useToast } from '@/ui/hooks'
import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

export function useChannelVisibility(defaultVisibility: boolean, channelId: string) {
  const [isChannelPublic, setIsChannelPublic] = useState(defaultVisibility)
  const [isSwitching, setIsSwitching] = useState(false)
  const [isCoping, setIsCopying] = useState(false)
  const [, copyInviteCode] = useCopyToClipboard()
  const { channelsService } = useApi()
  const { showError } = useToast()

  async function handleSwitchChange(isChannelPublic: boolean) {
    setIsSwitching(true)

    const response = await channelsService.toggleChannelVisibility(
      channelId,
      isChannelPublic,
    )
    setIsSwitching(false)

    console.log(response)

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    setIsChannelPublic(isChannelPublic)
  }

  async function handleInviteCodeCopyClick(inviteCode: string) {
    setIsCopying(true)
    await copyInviteCode(inviteCode)
    setIsCopying(false)
  }

  return {
    isSwitching,
    isCoping,
    isChannelPublic,
    handleInviteCodeCopyClick,
    handleSwitchChange,
  }
}
