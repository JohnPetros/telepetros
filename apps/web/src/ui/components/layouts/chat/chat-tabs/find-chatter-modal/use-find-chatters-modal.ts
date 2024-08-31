import { type RefObject, useState } from 'react'

import { CACHE } from '@/ui/constants/cache'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Chatter } from '@telepetros/core/entities'
import type { ModalRef } from '@/ui/components/shared/modal/types'

export function useFindChatterModal(
  onFind: (chatterName: string) => Promise<void>,
  modalRef: RefObject<ModalRef>,
) {
  const [chatterName, setChatterName] = useState('')
  const { chattersService } = useApi()
  const toast = useToast()

  function handleInputChange(value: string) {
    setChatterName(value)
  }

  async function handleSelectChatterCard(chatterId: string) {
    modalRef.current?.close()
    await onFind(chatterId)
  }

  async function fetchChatters() {
    const response = await chattersService.fetchChattersListByName(chatterName)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data, isLoading } = useCache({
    key: CACHE.chattersListByName.key,
    fetcher: fetchChatters,
    dependencies: [chatterName],
  })

  return {
    chatters: data?.map(Chatter.create),
    isLoading,
    chatterName,
    handleInputChange,
    handleSelectChatterCard,
  }
}
