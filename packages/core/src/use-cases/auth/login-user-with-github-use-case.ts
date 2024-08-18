import type { IUseCase } from '#interfaces/handlers'
import type { IAuthService } from '#interfaces/services'
import type { ChattersRepository } from '#interfaces/repositories'

type Request = {
  githubClientId: string
  githubClientSecret: string
  githubClientCode: string
}

export class LoginUserWithGithubUseCase implements IUseCase<Request, void> {
  constructor(
    private readonly authService: IAuthService,
    private readonly chattersRepository: ChattersRepository,
  ) {}

  async execute({
    githubClientId,
    githubClientSecret,
    githubClientCode,
  }: Request): Promise<void> {
    const response = await this.authService.fetchGithubUser(
      githubClientId,
      githubClientSecret,
      githubClientCode,
    )

    if (response.isFailure) response.throwError()
  }
}
