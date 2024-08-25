import type { IUseCase } from '#interfaces/handlers'
import type { IGoogleService } from '#interfaces/services'
import type { IChattersRepository } from '#interfaces/repositories'
import type { ChatterDto } from '#dtos'
import { Chatter } from '#domain/entities'

type Request = {
  googleClientId: string
  googleClientSecret: string
  googleClientCode: string
}

export class LoginWithGoogleUseCase implements IUseCase<Request, ChatterDto> {
  constructor(
    private readonly googleService: IGoogleService,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute({
    googleClientId,
    googleClientSecret,
    googleClientCode,
  }: Request): Promise<ChatterDto> {
    const response = await this.googleService.fetchUser(
      googleClientId,
      googleClientSecret,
      googleClientCode,
    )

    if (response.isFailure) {
      response.throwError()
    }

    const chatter = Chatter.create(response.body)
    const chatterExists = await this.chattersRepository.findByEmail(chatter.email)

    if (!chatterExists) {
      const addedChatter = await this.chattersRepository.add(chatter)
      return addedChatter
    }

    return chatterExists.dto
  }
}
