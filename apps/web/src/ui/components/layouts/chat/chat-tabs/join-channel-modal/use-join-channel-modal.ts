import { useState } from 'react'

export function useJoinChannelModal(onjoin: (name: string) => Promise<void>) {
  const [inviteCode, setInviteCode] = useState('')

  async function handleModalConfirm() {
    if (inviteCode) {
      setInviteCode('')
      await onjoin(inviteCode)
    }
  }

  function handleInputChange(value: string) {
    setInviteCode(value)
  }

  return {
    inviteCode,
    handleModalConfirm,
    handleInputChange,
  }
}
