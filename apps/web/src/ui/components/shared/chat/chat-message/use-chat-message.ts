import { useState } from 'react'

import { useApi } from '@/ui/hooks'
import type { Attachment } from '@telepetros/core/structs'

export function useChatMessage(attachment: Attachment | null) {
  const { uploadService } = useApi()
  const [isFailedToLoad, setIsFailedToLoad] = useState(false)

  async function loadFile() {
    // if (!attachment) return

    const response = await uploadService.fetchFile(
      'https://res.cloudinary.com/dswcdkj9c/raw/upload/v1725144456/avatars/k2ai8hzy7pfcqfry1xjj.doc',
      'attachment',
    )

    if (response.isFailure) {
      setIsFailedToLoad(true)
      return
    }

    if (response.isSuccess) {
      console.log(response.body)
    }
  }

  return {
    isFailedToLoad,
  }
}
