import { AppError } from '@telepetros/core/errors'
import { webEnvSchema } from '@telepetros/validation/schemas'

const envValidation = webEnvSchema.safeParse({
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
})

if (!envValidation.success) throw new AppError('Invalid web env variables')

export const ENV = envValidation.data
