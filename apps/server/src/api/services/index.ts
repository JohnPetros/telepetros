import { ApiClient } from '../client'
import { GithubService } from './github-service'
import { GoogleService } from './google-service'

const apiClient = new ApiClient()
export const githubService = new GithubService(apiClient)
export const googleService = new GoogleService(apiClient)
