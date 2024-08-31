'use client'

import { type ChangeEvent, useState, type KeyboardEvent } from 'react'

export function useChatInput(onSend: (text: string, file: File | null) => void) {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() !== 'enter') return

    if (text) {
      onSend(text, file)
      setText('')
      setFile(null)
      return
    }
  }

  function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0)
    if (file) setFile(file)
  }

  function handleRemoveButtonClick() {
    setFile(null)
  }

  return {
    text,
    file,
    handleChangeText,
    handleChangeFile,
    handleKeyDown,
    handleRemoveButtonClick,
  }
}
