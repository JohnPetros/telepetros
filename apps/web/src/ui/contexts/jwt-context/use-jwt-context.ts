import { useContext } from 'react'

import { AppError } from '@telepetros/core/errors'

import { JwtContext } from '.'

export function useJwtContext() {
  const context = useContext(JwtContext)

  if (!context)
    throw new AppError('useJwtContext must be used inside jwt context provider')

  return context
}
