import { ApiClient } from '../client'
import { AuthService } from './auth-service'

const apiClient = new ApiClient()
export const authService = new AuthService(apiClient)
