import { AuthError } from './auth-error'

export class LoginWithGithubError extends AuthError {
  constructor() {
    super('Login with github error')
  }
}
