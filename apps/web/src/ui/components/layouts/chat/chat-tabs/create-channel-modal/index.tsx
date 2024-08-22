import type { ReactNode } from 'react'

import { Modal } from '@/ui/components/shared/modal'
import { Icon } from '@/ui/components/shared/icon'
import { Input } from '@/ui/components/shared/input'
import { useCreateChannelModal } from './use-create-channel-modal'
import { ImagePicker } from '@/ui/components/shared/image-picker'

type CreateChannelModalProps = {
  children: ReactNode
  onCreate: (name: string) => Promise<void>
}

export const CreateChannelModal = ({ children, onCreate }: CreateChannelModalProps) => {
  const { handleModalConfirm, handleInputChange } = useCreateChannelModal(onCreate)

  return (
    <Modal title='Create Channel' onConfirm={handleModalConfirm} trigger={children}>
      <p className='text-slate-700'>Give your channel a beautiful name and icon.</p>
      <ImagePicker />
      <Input
        type='text'
        variant='flat'
        label='Email'
        labelPlacement='outside'
        autoFocus
        required
        onChange={handleInputChange}
        classNames={{
          inputWrapper: ['focus-within:ring-2', 'focus-within:ring-blue-500'],
        }}
      />
    </Modal>
  )
}
