import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IAuthService } from '@telepetros/core/interfaces'
import { ServiceResponse } from '@telepetros/core/responses'

type GithubUser = {
  email: string
  name: string
  avatar_url: string
}

export class AuthService implements IAuthService {
  constructor(private readonly apiClient: IApiClient) {}

  async fetchGithubUser(
    githubClientId: string,
    githubClientSecret: string,
    githubClientCode: string,
  ): Promise<ServiceResponse<ChatterDto>> {
    this.apiClient.setParam('client_id', githubClientId)
    this.apiClient.setParam('client_secret', githubClientSecret)
    this.apiClient.setParam('code', githubClientCode)

    const accessTokenResponse = await this.apiClient.post(
      'https://github.com/login/oatuh/access_token',
    )

    if (accessTokenResponse.isError) {
      return new ServiceResponse({ error: Error })
    }

    const accessToken = accessTokenResponse.body

    this.apiClient.setHeader('Authorization', `Bearer ${accessToken}`)

    const userResponse = await this.apiClient.get<GithubUser>(
      'https://api.github.com/user',
    )

    if (userResponse.isError) {
      userResponse.errorMessage
      return new ServiceResponse({ error: Error })
    }

    const githubUser = userResponse.body

    console.log(githubUser)

    const chatterDto: ChatterDto = {
      name: githubUser.name,
      email: githubUser.email,
      avatar: githubUser.avatar_url,
    }

    return new ServiceResponse({ data: chatterDto })
  }
}
