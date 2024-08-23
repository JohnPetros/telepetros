import type { NextRequest, MiddlewareConfig } from 'next/server'

import { VerifyJwtController } from './infra/api/controllers'
import { NextHttp } from './infra/api/next/next-http'
import { produceAuthService } from './infra/api/factories/produce-auth-service'

const Middleware = (request: NextRequest) => {
  const http = NextHttp({ request })
  const authService = produceAuthService(http)
  const controller = VerifyJwtController(authService)
  const response = controller.handle(http)

  if (response) return response
}

export const config: MiddlewareConfig = {
  matcher: '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
}

export default Middleware
