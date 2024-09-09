import { Button, Textarea } from '@nextui-org/react'
import { useChatMessageBeingEditing } from './use-chat-message-being-editing'

type ChatMessageBeignEditedProps = {
  onEdit: (newText: string) => void
  onCancel: () => void
}

export const ChatMessageBeingEdited = ({
  onEdit,
  onCancel,
}: ChatMessageBeignEditedProps) => {
  const { newText, handleTextAreaChange, handleTSaveButtonClick } =
    useChatMessageBeingEditing(onEdit)

  return (
    <div className='flex flex-col gap-3'>
      <Textarea
        isRequired
        label='Description'
        labelPlacement='outside'
        placeholder='Enter your description'
        value={newText}
        onChange={handleTextAreaChange}
        className='max-w-xs'
      />
      <p>Press enter to save • escape to exit</p>
      <div className='flex items-center gap-3'>
        <Button color='primary' onClick={handleTSaveButtonClick}>
          Save changes
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}
