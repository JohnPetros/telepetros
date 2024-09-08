import { useCallback, useEffect, useState } from 'react'

import { useApi } from '@/ui/hooks'
import type { Attachment } from '@telepetros/core/structs'

export function useChatMessage(attachment: Attachment | null) {
  const [file, setFile] = useState<File | null>(null)
  const [isFailedToLoad, setIsFailedToLoad] = useState(false)

  return {
    file,
    isFailedToLoad,
  }
}
