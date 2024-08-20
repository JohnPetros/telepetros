import { AuthError } from './auth-error'

export class GithubUserNotFoundError extends AuthError {
  constructor() {
    super('Github access token not found')
  }
}
