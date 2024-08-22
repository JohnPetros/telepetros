import { Modal } from '../../shared/modal'

type ErrorPageProps = {
  errorMessage: string
}

export const ErrorPage = ({errorMessage}: ErrorPageProps) => {
  return (
    <main>
      <h1>{errorMessage}</h1>
      <Modal title='Error' onConfirm={() => {}}>
        <p>Error message</p>
      </Modal>
    </main>
  )
}
