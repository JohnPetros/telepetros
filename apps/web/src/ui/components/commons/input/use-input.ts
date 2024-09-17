import type { ChangeEvent } from 'react'

export function useInput(onChange: (value: string) => void) {
  function handleChange({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    onChange(currentTarget.value)
  }

  return {
    handleChange,
  }
}
