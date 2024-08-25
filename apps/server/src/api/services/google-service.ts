import { ENV } from '@/constants'
import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IGoogleService } from '@telepetros/core/interfaces'
import { ApiResponse } from '@telepetros/core/responses'

type AccessTokenResponse = {
  access_token: string
}

type GoogleUserResponse = {
  name: string
  picture: string
  email: string
}

export class GoogleService implements IGoogleService {
  constructor(private readonly apiClient: IApiClient) {}

  async fetchUser(
    googleClientId: string,
    googleClientSecret: string,
    googleClientCode: string,
  ): Promise<ApiResponse<ChatterDto>> {
    this.apiClient.setParam('client_id', googleClientId)
    this.apiClient.setParam('client_secret', googleClientSecret)
    this.apiClient.setParam('code', googleClientCode)
    this.apiClient.setParam('redirect_uri', `${ENV.webUrl}/api/auth/callback/google`)
    this.apiClient.setParam('grant_type', 'authorization_code')

    const accessTokenResponse = await this.apiClient.post<AccessTokenResponse>(
      'https://oauth2.googleapis.com/token',
    )

    if (accessTokenResponse.isFailure) {
      return new ApiResponse({
        statusCode: accessTokenResponse.statusCode,
        error: 'google access token not found',
      })
    }

    const { access_token } = accessTokenResponse.body

    this.apiClient.setParam('access_token', access_token)

    const userResponse = await this.apiClient.get<GoogleUserResponse>(
      'https://www.googleapis.com/oauth2/v3/userinfo',
    )

    if (userResponse.isFailure) {
      return new ApiResponse({
        statusCode: userResponse.statusCode,
        error: 'google user not found',
      })
    }

    const googleUser = userResponse.body

    const chatterDto: ChatterDto = {
      name: googleUser.name,
      email: googleUser.email,
      avatar: googleUser.picture,
    }

    return new ApiResponse({ body: chatterDto, statusCode: userResponse.statusCode })
  }
}
