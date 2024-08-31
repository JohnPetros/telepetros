import { useRef, type ReactNode } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

import { Modal } from '@/ui/components/shared/modal'
import { ChatCard } from '@/ui/components/shared/chat-card'
import type { ModalRef } from '@/ui/components/shared/modal/types'
import { useFindChatterModal } from './use-find-chatters-modal'

type CreateChannelModalProps = {
  children: ReactNode
  onFind: (name: string) => Promise<void>
}

export const FindChatterModal = ({ children, onFind }: CreateChannelModalProps) => {
  const modalRef = useRef<ModalRef>(null)
  const { isLoading, chatters, chatterName, handleInputChange, handleSelectChatterCard } =
    useFindChatterModal(onFind, modalRef)

  return (
    <Modal ref={modalRef} title='Join Channel' trigger={children}>
      <p className='text-slate-700'>Find a chatter to chat with.</p>
      <Autocomplete
        variant='bordered'
        isLoading={isLoading}
        label='Chatter Name'
        value={chatterName}
        items={chatters}
        onChange={({ currentTarget }) => handleInputChange(currentTarget.value)}
        onSelectionChange={(key) => handleSelectChatterCard(String(key))}
      >
        {(item) => (
          <AutocompleteItem key={item.id} className='capitalize'>
            <ChatCard.Container as='button' className='my-3'>
              <ChatCard.Info
                name={item.name}
                avatar={item.avatar}
                isOnline={item.isOnline}
                showOnlineState
              />
            </ChatCard.Container>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </Modal>
  )
}
