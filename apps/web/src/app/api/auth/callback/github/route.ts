import type { NextRequest } from 'next/server'

import { NextHttp } from '@/infra/api/next/next-http'
import { LoginWithGithubController } from '@/infra/api/controllers'
import { HttpNextApiClient } from '@/infra/api/next'
import { AuthService } from '@/infra/api/services'

export async function GET(request: NextRequest) {
  const http = NextHttp({ request })
  const nextApiClient = HttpNextApiClient(http)
  const authService = AuthService(nextApiClient)
  const controller = LoginWithGithubController(authService)
  return await controller.handle(http)
}
