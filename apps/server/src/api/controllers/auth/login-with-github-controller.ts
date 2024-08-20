import type { IController, IHttp } from '@telepetros/core/interfaces'
import { LoginWithGithubUseCase } from '@telepetros/core/use-cases'

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

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsIm5hbWUiOiJKb8OjbyBQZWRybyBDYXJ2YWxobyIsImVtYWlsIjoiam9hb3BlZHJvLm5jQG91dGxvb2suY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzkzODkzNTMzP3Y9NCIsImJhbm5lciI6IiIsInN1YiI6IiIsImlhdCI6MTcyNDAyNDcyOSwiZXhwIjoxNzI2NjE2NzI5fQ.oFtI3QPaCbUmA8EKdkAFEK-8dYlKg1h3JrDASAuKjNE

    const jwt = await http.signJwt(chatterDto)

    return http.send({ jwt })
  }
}
