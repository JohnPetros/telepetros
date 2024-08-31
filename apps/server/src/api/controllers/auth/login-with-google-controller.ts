import type { IController, IHttp } from '@telepetros/core/interfaces'
import { LoginWithGoogleUseCase } from '@telepetros/core/use-cases'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { ENV } from '@/constants'
import { googleService } from '@/api/services'
import { chattersRepository } from '@/database'

type Body = {
  googleClientCode: string
}

export class LoginWithGoogleController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const useCase = new LoginWithGoogleUseCase(googleService, chattersRepository)

    const chatterDto = await useCase.execute({
      googleClientCode: http.body.googleClientCode,
      googleClientId: ENV.googleClientId,
      googleClientSecret: ENV.googleClientSecret,
    })

    const jwt = await http.signJwt(chatterDto)

    return http.send({ jwt }, HTTP_STATUS_CODE.created)
  }
}
