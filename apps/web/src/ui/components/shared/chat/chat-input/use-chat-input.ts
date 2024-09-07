'use client'

import { type ChangeEvent, useState, type KeyboardEvent } from 'react'

export function useChatInput(onSend: (text: string, file: File | null) => Promise<void>) {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value)
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() !== 'enter') return

    if (file) {
      await onSend(text, file)
      setText('')
      setFile(null)
      setIsUploading(false)
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
    isUploading,
    handleChangeText,
    handleChangeFile,
    handleKeyDown,
    handleRemoveButtonClick,
  }
}
