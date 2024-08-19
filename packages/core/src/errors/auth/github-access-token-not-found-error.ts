import { AuthError } from './auth-error'

export class GithubAccessTokenNotFoundError extends AuthError {
  constructor() {
    super('Github access token not found')
  }
}
