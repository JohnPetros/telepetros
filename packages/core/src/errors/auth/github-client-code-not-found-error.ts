import { AuthError } from './auth-error'

export class GithubClientCodeNotFoundError extends AuthError {
  constructor() {
    super('Github client code not found')
  }
}
