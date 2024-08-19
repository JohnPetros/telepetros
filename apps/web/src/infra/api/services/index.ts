import { NextApiClient } from '../next/next-api-client'
import { AuthService } from './auth-service'

const apiClient = NextApiClient()
export const authService = AuthService(apiClient)
