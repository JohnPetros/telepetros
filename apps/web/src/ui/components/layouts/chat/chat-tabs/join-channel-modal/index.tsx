import type { ReactNode } from 'react'

import { Modal } from '@/ui/components/commons/modal'
import { Input } from '@/ui/components/commons/input'
import { useJoinChannelModal } from './use-join-channel-modal'
import { Icon } from '@/ui/components/commons/icon'

type CreateChannelModalProps = {
  children: ReactNode
  onJoin: (name: string) => Promise<void>
}

export const JoinChannelModal = ({ children, onJoin }: CreateChannelModalProps) => {
  const { inviteCode, handleInputChange, handleModalConfirm } =
    useJoinChannelModal(onJoin)

  return (
    <Modal title='Join Channel' onConfirm={handleModalConfirm} trigger={children}>
      <p className='text-slate-700'>Chat with other people in the channel.</p>
      <Input
        type='text'
        label='Invite Code'
        autoFocus
        required
        value={inviteCode}
        startContent={<Icon name='at' size={24} />}
        onChange={handleInputChange}
      />
    </Modal>
  )
}
