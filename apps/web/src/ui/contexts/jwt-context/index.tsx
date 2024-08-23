'use client'

import { createContext, type ReactNode } from 'react'

const JwtContext = createContext<string | null>(null)

type JwtContextProviderProps = {
  children: ReactNode
  jwt: string | null
}

const JwtContextProvider = ({ children, jwt }: JwtContextProviderProps) => {
  return <JwtContext.Provider value={jwt}>{children}</JwtContext.Provider>
}

export { JwtContext, JwtContextProvider }
