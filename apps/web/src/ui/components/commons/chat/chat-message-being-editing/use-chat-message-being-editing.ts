import {
  useEffect,
  useState,
  type RefObject,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react'

export function useChatMessageBeingEditing(
  currentText: string,
  inputRef: RefObject<HTMLTextAreaElement>,
  onEdit: (newText: string) => void,
) {
  const [newText, setNewText] = useState(currentText)

  function handleTextAreaChange(event: ChangeEvent<HTMLInputElement>) {
    setNewText(event.currentTarget.value)
  }

  function handleTSaveButtonClick() {
    if (currentText !== newText) onEdit(newText)
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() !== 'enter') return

    if (currentText !== newText) onEdit(newText)
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.select()
  }, [inputRef])

  return {
    newText,
    handleKeyDown,
    handleTSaveButtonClick,
    handleTextAreaChange,
  }
}
