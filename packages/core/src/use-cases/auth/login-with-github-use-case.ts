import type { IUseCase } from '#interfaces/handlers'
import type { IGithubService } from '#interfaces/services'
import type { ChattersRepository } from '#interfaces/repositories'
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
    private readonly chattersRepository: ChattersRepository,
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

    if (response.isFailure) response.throwError()

    const chatter = Chatter.create(response.data)
    const chatterExists = await this.chattersRepository.findById(chatter.id)

    if (!chatterExists) await this.chattersRepository.add(chatter)

    return chatter.dto
  }
}
