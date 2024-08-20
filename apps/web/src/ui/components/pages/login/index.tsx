import { Button } from '@nextui-org/button'
import { Link, Card, CardBody, CardHeader } from '@nextui-org/react'

import { Icon } from '../../shared/icon'
import { Logo } from '../../shared/logo'
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
          </CardBody>
        </Card>
      </form>
    </main>
  )
}
