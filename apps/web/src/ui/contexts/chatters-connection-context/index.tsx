'use client'

import { createContext, type ReactNode } from 'react'
import { useChattersConnectionProvider } from './hooks/use-chatters-conection-provider'
import type { ChattersConnectionContextValue } from './types'

const ChattersConnectionContext = createContext<ChattersConnectionContextValue>(
  {} as ChattersConnectionContextValue,
)

type JwtContextProviderProps = {
  children: ReactNode
}

const ChattersConnectionContextProvider = ({ children }: JwtContextProviderProps) => {
  const value = useChattersConnectionProvider()

  return (
    <ChattersConnectionContext.Provider value={value}>
      {children}
    </ChattersConnectionContext.Provider>
  )
}

export { ChattersConnectionContext, ChattersConnectionContextProvider }
