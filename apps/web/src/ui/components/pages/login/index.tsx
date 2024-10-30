import { Button } from '@nextui-org/button'
import { Link, Card, CardBody, CardHeader } from '@nextui-org/react'

import { Icon } from '../../commons/icon'
import { Logo } from '../../commons/logo'
import { ENV } from '@/ui/constants'

export const LoginPage = () => {
  return (
    <main className='grid place-content-center h-screen'>
      <form>
        <Card className='p-6'>
          <CardHeader className='flex-col'>
            <div className='flex flex-col items-center justify-center w-max mx-auto'>
              <Logo size={80} />
              <h1 className='mt-1 text-slate-900 text-2xl font-bold'>Telepetros</h1>
            </div>
            <p className='text-slate-800 mt-6'>
              Login or register an account to Telepetros.
            </p>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Button
              href={`https://github.com/login/oauth/authorize?client_id=${ENV.githubClientId}`}
              as={Link}
              size='lg'
              className='bg-black text-gray-100'
              startContent={<Icon name='github' size={24} />}
            >
              Login with Github
            </Button>
            <Button
              href={`https://accounts.google.com/o/oauth2/auth?client_id=${ENV.googleClientId}&redirect_uri=${ENV.appUrl}/api/auth/callback/google&scope=profile%20email&response_type=code`}
              as={Link}
              size='lg'
              className='mt-3 bg-red-800 text-gray-100'
              startContent={<Icon name='google' size={24} />}
            >
              Login with Google
            </Button>
          </CardBody>
        </Card>
      </form>
    </main>
  )
}
