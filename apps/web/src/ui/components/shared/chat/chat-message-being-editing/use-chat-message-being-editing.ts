import { useState, type ChangeEvent } from 'react'

export function useChatMessageBeingEditing(onEdit: (newText: string) => void) {
  const [newText, setNewText] = useState('')

  function handleTextAreaChange(event: ChangeEvent<HTMLInputElement>) {
    setNewText(event.currentTarget.value)
  }

  function handleTSaveButtonClick() {
    onEdit(newText)
  }

  return {
    newText,
    handleTSaveButtonClick,
    handleTextAreaChange,
  }
}
