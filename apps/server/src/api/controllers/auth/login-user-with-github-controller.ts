import type { IController, IHttp } from '@telepetros/core/interfaces'
import { LoginUserWithGithubUseCase } from '@telepetros/core/use-cases'

import { authService } from '@/api/services'
import { ENV } from '@/constants'
import { ChattersRepository } from '@/database'

type Body = {
  githubClientCode: string
}

export class LoginUserWithGithubController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const channelsRepository = new ChattersRepository()
    // const useCase = new LoginUserWithGithubUseCase(authService, channelsRepository)

    // await useCase.execute({
    //   githubClientCode: http.body.githubClientCode,
    //   githubClientId: ENV.githubClientId,
    //   githubClientSecret: ENV.githubClientSecret,
    // })

    return http.send('LAURA')
  }
}
