'use client'

import { type ChangeEvent, useState, type KeyboardEvent } from 'react'

export function useChatInput(onSend: (value: string) => void) {
  const [value, setValue] = useState('')

  function handleChangeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() === 'enter') {
      onSend(value)
      setValue('')
    }
  }

  return {
    value,
    handleChangeValue,
    handleKeyDown,
  }
}
