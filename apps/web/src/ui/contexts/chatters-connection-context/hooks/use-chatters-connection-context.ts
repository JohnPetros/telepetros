import { useContext } from 'react'

import { AppError } from '@telepetros/core/errors'
import { ChattersConnectionContext } from '..'

export function useChattersConnectionContext() {
  const context = useContext(ChattersConnectionContext)

  if (!context)
    throw new AppError(
      'Context error',
      'useChattersConnectionContext hook must be used inside chatters connection context provider',
    )

  return context
}
