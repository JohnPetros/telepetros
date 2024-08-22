'use client'

import { createContext, type ReactNode } from 'react'

import type { AuthContextValue } from './types'
import { useAuthContext, useAuthContextProvider } from './hooks'

const AuthContext = createContext({} as AuthContextValue)

type AuthContextProviderProps = {
  children: ReactNode
  jwt: string
}

const AuthContextProvider = ({ children, jwt }: AuthContextProviderProps) => {
  const contextValue = useAuthContextProvider(jwt)

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider, useAuthContext }
