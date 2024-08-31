import type { IController, IHttp } from '@telepetros/core/interfaces'
import { LoginWithGithubUseCase } from '@telepetros/core/use-cases'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { ENV } from '@/constants'
import { githubService } from '@/api/services'
import { chattersRepository } from '@/database'

type Body = {
  githubClientCode: string
}

export class LoginWithGithubController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const useCase = new LoginWithGithubUseCase(githubService, chattersRepository)

    const chatterDto = await useCase.execute({
      githubClientCode: http.body.githubClientCode,
      githubClientId: ENV.githubClientId,
      githubClientSecret: ENV.githubClientSecret,
    })

    const jwt = await http.signJwt(chatterDto)

    return http.send({ jwt }, HTTP_STATUS_CODE.created)
  }
}
