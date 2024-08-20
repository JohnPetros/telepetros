import { ApiClient } from '../client'
import { GithubService } from './github-service'

const apiClient = new ApiClient()
export const githubService = new GithubService(apiClient)
