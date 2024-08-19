import type { NextRequest } from 'next/server'

import { NextHttp } from '@/infra/api/next/next-http'
import { LoginWithGithubController } from '@/infra/api/controllers'
import { authService } from '@/infra/api/services'

export async function GET(request: NextRequest) {
  const http = NextHttp({ request })
  const controller = LoginWithGithubController(authService)
  const response = await controller.handle(http)
  return response
}
