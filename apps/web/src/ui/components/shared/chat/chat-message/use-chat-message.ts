import { useCallback, useEffect, useState } from 'react'

import { useApi } from '@/ui/hooks'
import type { Attachment } from '@telepetros/core/structs'

export function useChatMessage(attachment: Attachment | null) {
  const { uploadService } = useApi()
  const [isFailedToLoad, setIsFailedToLoad] = useState(false)

  const loadFile = useCallback(async () => {
    // if (!attachment) return

    const response = await uploadService.fetchFile(
      'https://res.cloudinary.com/dswcdkj9c/image/upload/v1725748627/attachments/oricvhkqa4epjxjbacys.pdf',
      'attachment',
    )

    console.log(response.isFailure)

    if (response.isFailure) {
      setIsFailedToLoad(true)
      return
    }

    if (response.isSuccess) {
      console.log(response.body)
    }
  }, [uploadService.fetchFile])

  useEffect(() => {
    loadFile()
  }, [loadFile])

  return {
    isFailedToLoad,
  }
}
