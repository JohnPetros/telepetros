import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IGithubService } from '@telepetros/core/interfaces'
import {
  GithubAccessTokenNotFoundError,
  GithubUserNotFoundError,
} from '@telepetros/core/errors'
import { ServiceResponse } from '@telepetros/core/responses'

type AccessTokenResponse = {
  access_token: string
}

type GithubUserResponse = {
  email: string
  name: string
  avatar_url: string
}

export class GithubService implements IGithubService {
  constructor(private readonly apiClient: IApiClient) {}

  async fetchUser(
    githubClientId: string,
    githubClientSecret: string,
    githubClientCode: string,
  ): Promise<ServiceResponse<ChatterDto>> {
    this.apiClient.setParam('client_id', githubClientId)
    this.apiClient.setParam('client_secret', githubClientSecret)
    this.apiClient.setParam('code', githubClientCode)

    const accessTokenResponse = await this.apiClient.post<AccessTokenResponse>(
      'https://github.com/login/oauth/access_token',
    )

    if (accessTokenResponse.isError) {
      return new ServiceResponse({ error: GithubUserNotFoundError })
    }

    const { access_token } = accessTokenResponse.body

    this.apiClient.setHeader('Authorization', `Bearer ${access_token}`)

    const userResponse = await this.apiClient.get<GithubUserResponse>(
      'https://api.github.com/user',
    )

    if (userResponse.isError) {
      return new ServiceResponse({ error: GithubAccessTokenNotFoundError })
    }

    const githubUser = userResponse.body
    console.log({ githubUser })

    const chatterDto: ChatterDto = {
      name: githubUser.name,
      email: githubUser.email,
      avatar: githubUser.avatar_url,
    }

    return new ServiceResponse({ data: chatterDto })
  }
}
