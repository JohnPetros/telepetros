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
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryCloundName: process.env.CLOUDINARY_CLOUND_NAME,
})

if (!envValidation.success) {
  console.log(envValidation.error.flatten().fieldErrors)
  throw new AppError('Env vars error', 'variables are wrong')
}

export const ENV = envValidation.data
