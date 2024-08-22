import { useState } from 'react'

export function useCreateChannelModal(onCreate: (name: string) => Promise<void>) {
  const [channelName, setChannelName] = useState('')

  async function handleModalConfirm() {
    await onCreate(channelName)
  }

  function handleInputChange(value: string) {
    setChannelName(value)
  }

  return {
    handleModalConfirm,
    handleInputChange,
  }
}
