import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IGithubService } from '@telepetros/core/interfaces'
import { ApiResponse } from '@telepetros/core/responses'

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
  ): Promise<ApiResponse<ChatterDto>> {
    this.apiClient.setParam('client_id', githubClientId)
    this.apiClient.setParam('client_secret', githubClientSecret)
    this.apiClient.setParam('code', githubClientCode)

    const accessTokenResponse = await this.apiClient.post<AccessTokenResponse>(
      'https://github.com/login/oauth/access_token',
    )

    if (accessTokenResponse.isFailure) {
      return new ApiResponse({
        statusCode: accessTokenResponse.statusCode,
        error: 'Github access token not found',
      })
    }

    const { access_token } = accessTokenResponse.body

    this.apiClient.setHeader('Authorization', `Bearer ${access_token}`)

    const userResponse = await this.apiClient.get<GithubUserResponse>(
      'https://api.github.com/user',
    )

    if (userResponse.isFailure) {
      return new ApiResponse({
        statusCode: userResponse.statusCode,
        error: 'Github user not found',
      })
    }

    const githubUser = userResponse.body

    const chatterDto: ChatterDto = {
      name: githubUser.name,
      email: githubUser.email,
      avatar: githubUser.avatar_url,
    }

    return new ApiResponse({ body: chatterDto, statusCode: userResponse.statusCode })
  }
}
