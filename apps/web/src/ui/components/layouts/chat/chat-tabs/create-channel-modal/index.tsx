import type { ReactNode } from 'react'

import { useCreateChannelModal } from './use-create-channel-modal'
import { Modal } from '@/ui/components/commons/modal'
import { Input } from '@/ui/components/commons/input'
import { ImagePicker } from '@/ui/components/commons/image-picker'
import { Icon } from '@/ui/components/commons/icon'
import { Image } from '@nextui-org/react'

type CreateChannelModalProps = {
  children: ReactNode
  onCreate: (name: string, avatarFile: File) => Promise<void>
}

export const CreateChannelModal = ({ children, onCreate }: CreateChannelModalProps) => {
  const { handleModalConfirm, handleInputChange, handlePickImage } =
    useCreateChannelModal(onCreate)

  return (
    <Modal title='Create Channel' onConfirm={handleModalConfirm} trigger={children}>
      <p className='text-slate-700'>Give your channel a beautiful name and icon.</p>
      <ImagePicker id='avatar' onPick={handlePickImage}>
        {(avatar) => (
          <div className='grid place-content-center mx-auto size-48 mt-3 bg-slate-100 rounded-full cursor-pointer'>
            {avatar ? (
              <Image
                src={avatar}
                alt='cropped image'
                radius='full'
                width={192}
                height={192}
              />
            ) : (
              <Icon name='image' size={48} className='text-slate-500' />
            )}
          </div>
        )}
      </ImagePicker>
      <Input
        type='text'
        variant='flat'
        label='Name'
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
