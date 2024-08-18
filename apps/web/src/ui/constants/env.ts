import { webEnvSchema } from '@telepetros/validation/schemas'

const envValidation = webEnvSchema.safeParse({
  githubClientId: process.env.NEXT_GITHUB_CLIENT_ID,
})

if (!envValidation.success) throw Error('Invalid web env variables')

export const ENV = envValidation.data
