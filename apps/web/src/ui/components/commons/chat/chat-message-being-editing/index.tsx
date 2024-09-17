import { Button, Textarea } from '@nextui-org/react'
import { useChatMessageBeingEditing } from './use-chat-message-being-editing'
import { useRef } from 'react'

type ChatMessageBeignEditedProps = {
  currentText: string
  isEditing: boolean
  onEdit: (newText: string) => void
  onCancel: () => void
}

export const ChatMessageBeingEdited = ({
  currentText,
  isEditing,
  onEdit,
  onCancel,
}: ChatMessageBeignEditedProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { newText, handleKeyDown, handleTextAreaChange, handleTSaveButtonClick } =
    useChatMessageBeingEditing(currentText, inputRef, onEdit)

  return (
    <div className='flex flex-col gap-3 w-[24rem] mr-16'>
      <Textarea
        ref={inputRef}
        isRequired
        labelPlacement='outside'
        placeholder='Enter your description'
        fullWidth
        value={newText}
        onKeyDown={handleKeyDown}
        onChange={handleTextAreaChange}
      />
      <p>Press enter to save</p>
      <div className='flex items-center gap-3'>
        <Button color='primary' isLoading={isEditing} onClick={handleTSaveButtonClick}>
          Save changes
        </Button>
        <Button isDisabled={isEditing} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
