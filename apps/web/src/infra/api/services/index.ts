import { NextApiClient } from '../next/next-api-client'
import { AuthService } from './auth-service'

const apiClient = NextApiClient()
apiClient.setBaseUrl('http://localhost:3210')

export const authService = AuthService(apiClient)
