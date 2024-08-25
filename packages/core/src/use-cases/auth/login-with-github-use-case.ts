import type { IUseCase } from '#interfaces/handlers'
import type { IGithubService } from '#interfaces/services'
import type { IChattersRepository } from '#interfaces/repositories'
import type { ChatterDto } from '#dtos'
import { Chatter } from '#domain/entities'

type Request = {
  githubClientId: string
  githubClientSecret: string
  githubClientCode: string
}

export class LoginWithGithubUseCase implements IUseCase<Request, ChatterDto> {
  constructor(
    private readonly githubService: IGithubService,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute({
    githubClientId,
    githubClientSecret,
    githubClientCode,
  }: Request): Promise<ChatterDto> {
    const response = await this.githubService.fetchUser(
      githubClientId,
      githubClientSecret,
      githubClientCode,
    )

    if (response.isFailure) {
      response.throwError()
    }

    const chatter = Chatter.create(response.body)
    const chatterExists = await this.chattersRepository.findByEmail(chatter.email)

    if (!chatterExists) {
      const addedChatter = await this.chattersRepository.add(chatter)
      return addedChatter.dto
    }

    return chatter.dto
  }
}
