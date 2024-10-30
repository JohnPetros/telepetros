import { Avatar, Button, Image, Input } from '@nextui-org/react'

import { useChannelInfoForm } from './use-channel-info-form'
import { Icon } from '@/ui/components/commons/icon'
import { ImagePicker } from '@/ui/components/commons/image-picker'
import { Controller } from 'react-hook-form'
import { Modal } from '@/ui/components/commons/modal'

type ChannelInfoFormProps = {
  name: string
  inviteCode: string
  avatar: string
  banner: string
}

export const ChannelInfoForm = ({
  name,
  inviteCode,
  avatar,
  banner,
}: ChannelInfoFormProps) => {
  const { formControl, fieldErrors, registerField } = useChannelInfoForm({
    name,
    inviteCode,
    avatar,
    banner,
  })

  return (
    <Modal
      title='Edit channel'
      buttonTitle='Save changes'
      trigger={
        <Button className='text-slate-800 bg-slate-200 font-semibold'>Edit info</Button>
      }
    >
      <Controller
        name='banner'
        control={formControl}
        render={({ field: { onChange } }) => (
          <ImagePicker id='banner' onPick={onChange}>
            {(banner) => (
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
        )}
      />

      <Controller
        name='avatar'
        control={formControl}
        render={({ field: { onChange } }) => (
          <ImagePicker id='avatar' onPick={onChange}>
            {(avatar) => (
              <div>
                {avatar ? <Avatar src={avatar} size='sm' /> : <Avatar name={name[0]} />}
              </div>
            )}
          </ImagePicker>
        )}
      />

      {avatar ? (
        <Avatar
          src={avatar}
          size='sm'
          classNames={{
            base: 'w-32 h-32 text-base ring-2 ring-white -translate-y-1/2',
          }}
        />
      ) : (
        <Avatar
          name={name[0]}
          size='sm'
          classNames={{
            base: 'w-32 h-32 text-base ring-2 ring-white -translate-y-1/2',
            name: 'text-xl',
          }}
          color='primary'
        />
      )}
      <Input
        label='Name'
        labelPlacement='outside'
        errorMessage={fieldErrors.name?.message}
        isInvalid={Boolean(fieldErrors.name)}
        {...registerField('name')}
      />
      <div className='mt-3'>
        <label htmlFor='invite-code' className='text-zinc-700'>
          Invite code
        </label>
        <p className='text-zinc-500'>People can find a group by its invite code.</p>
        <Input
          id='invite-code'
          labelPlacement='outside'
          startContent={<Icon name='at' />}
          errorMessage={fieldErrors.inviteCode?.message}
          isInvalid={Boolean(fieldErrors.inviteCode)}
          {...registerField('inviteCode')}
        />
        <p className='text-zinc-500'>Only lower-case letters, numbers and underscore.</p>
      </div>

      <Button>Save changes</Button>
      <Button>Cancel</Button>
    </Modal>
  )
}
