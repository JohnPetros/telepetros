'use client'

import {
  type ChangeEvent,
  useState,
  type KeyboardEvent,
  type RefObject,
  useEffect,
} from 'react'

type UseChatInputParams = {
  formRef: RefObject<HTMLFormElement>
  inputRef: RefObject<HTMLInputElement>
  isReplying: boolean
  onSend: (text: string, file: File | null) => Promise<void>
}

export function useChatInput({
  formRef,
  inputRef,
  isReplying,
  onSend,
}: UseChatInputParams) {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value)
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() !== 'enter') return

    if (text || file) {
      await onSend(text, file)

      setText('')
      setFile(null)
      setIsUploading(false)
      formRef.current?.reset()
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

  useEffect(() => {
    if (isReplying) inputRef.current?.focus()
  }, [isReplying, inputRef.current?.focus])

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
