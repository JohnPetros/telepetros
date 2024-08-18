import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/react'

export const LoginPage = () => {
  return (
    <main className='grid place-content-center h-screen'>
      <Card className='py-4'>
        <CardBody className='overflow-visible py-2'>
          <Button color='primary' variant='bordered' startContent={'OPA'}>
            Delete user
          </Button>
        </CardBody>
      </Card>
    </main>
  )
}
