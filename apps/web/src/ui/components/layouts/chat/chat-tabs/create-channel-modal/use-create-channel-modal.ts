import { useState } from 'react'

export function useCreateChannelModal(
  onCreate: (name: string, avatarFile: File) => Promise<void>,
) {
  const [channelName, setChannelName] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  async function handleModalConfirm() {
    if (avatarFile) await onCreate(channelName, avatarFile)
  }

  function handlePickImage(file: File) {
    setAvatarFile(file)
  }

  function handleInputChange(value: string) {
    setChannelName(value)
  }

  return {
    handleModalConfirm,
    handlePickImage,
    handleInputChange,
  }
}
