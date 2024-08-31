import type { NextRequest, MiddlewareConfig } from 'next/server'

import { VerifyJwtController } from './infra/api/controllers'
import { NextHttp } from './infra/api/next/next-http'
import { AuthService } from './infra/api/services/auth-service'
import { HttpNextApiClient } from './infra/api/next'

const Middleware = (request: NextRequest) => {
  const http = NextHttp({ request })
  const nextApiClient = HttpNextApiClient(http)
  const authService = AuthService(nextApiClient)
  const controller = VerifyJwtController(authService)
  const response = controller.handle(http)

  if (response) return response
}

export const config: MiddlewareConfig = {
  matcher: '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
}

export default Middleware
