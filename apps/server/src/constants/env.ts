import { serverEnvSchema } from '@telepetros/validation/schemas'

const envValidation = serverEnvSchema.safeParse({
  port: process.env.POST,
  mode: process.env.MODE,
})

if (!envValidation.success) {
  throw new Error('Invalid server env variables')
}

export const ENV = envValidation.data
