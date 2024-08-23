'use client'

import { createContext, type ReactNode } from 'react'

import type { AuthContextValue } from './types'
import { useAuthContext, useAuthContextProvider } from './hooks'
import { useJwtContext } from '../jwt-context/use-jwt-context'

const AuthContext = createContext({} as AuthContextValue)

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const jwt = useJwtContext()
  const contextValue = useAuthContextProvider(jwt)

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider, useAuthContext }
