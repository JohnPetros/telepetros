import { serverEnvSchema } from '@telepetros/validation/schemas'

const envValidation = serverEnvSchema.safeParse({
  port: process.env.PORT,
  mode: process.env.MODE,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
})

if (!envValidation.success) {
  throw new Error('Invalid server env variables')
}

export const ENV = envValidation.data
