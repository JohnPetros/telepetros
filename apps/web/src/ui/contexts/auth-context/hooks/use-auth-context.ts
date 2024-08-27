import { useContext } from 'react'
import { AuthContext } from '..'
import { AppError } from '@telepetros/core/errors'

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context)
    throw new AppError(
      'Context error',
      'Auth context must be used inside auth context provider',
    )

  return context
}
