import type { NextRequest } from 'next/server'

import { NextHttp } from '@/infra/api/next/next-http'
import { LoginWithGoogleController } from '@/infra/api/controllers'
import { produceAuthService } from '@/infra/api/factories/produce-auth-service'

export async function GET(request: NextRequest) {
  const http = NextHttp({ request })
  const authService = produceAuthService(http)
  const controller = LoginWithGoogleController(authService)
  return await controller.handle(http)
}
