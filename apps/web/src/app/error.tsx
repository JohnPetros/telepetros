'use client'

import { ErrorPage } from '@/ui/components/pages/error'

type PageProps = {
  error: Error
  reset: VoidFunction
}

const Page = ({ error, reset }: PageProps) => {
  return <ErrorPage errorMessage={error.message} />
}

export default Page
