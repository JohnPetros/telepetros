import { AppError } from '@telepetros/core/errors'
import { serverEnvSchema } from '@telepetros/validation/schemas'

const envValidation = serverEnvSchema.safeParse({
  port: process.env.PORT,
  mode: process.env.MODE,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  webUrl: process.env.WEB_URL,
})

if (!envValidation.success) {
  console.log(envValidation.error.flatten().fieldErrors)
  throw new AppError('Env vars error', 'variables are wrong')
}

export const ENV = envValidation.data
