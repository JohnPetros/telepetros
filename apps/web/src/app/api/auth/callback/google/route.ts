import type { NextRequest } from 'next/server'

import { NextHttp } from '@/infra/api/next/next-http'
import { LoginWithGoogleController } from '@/infra/api/controllers'
import { AuthService } from '@/infra/api/services'
import { HttpNextApiClient } from '@/infra/api/next'

export async function GET(request: NextRequest) {
  const http = NextHttp({ request })
  const nextApiClient = HttpNextApiClient(http)
  const authService = AuthService(nextApiClient)
  const controller = LoginWithGoogleController(authService)
  return await controller.handle(http)
}
