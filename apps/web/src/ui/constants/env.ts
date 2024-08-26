import { AppError } from '@telepetros/core/errors'
import { webEnvSchema } from '@telepetros/validation/schemas'

const envValidation = webEnvSchema.safeParse({
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  realTimeUrl: process.env.NEXT_PUBLIC_REAL_TIME_URL,
})

if (!envValidation.success)
  throw new AppError('Env Error', envValidation.error.issues.join(', '))

export const ENV = envValidation.data
