import { Input, type InputProps as NextUiInputProps } from '@nextui-org/react'

import { useInput } from './use-input'

type InputProps = {
  onChange: (value: string) => void
} & Omit<NextUiInputProps, 'onChange'>

const InputComponent = ({ onChange, ...inputProps }: InputProps) => {
  const { handleChange } = useInput(onChange)

  return (
    <Input
      variant='flat'
      labelPlacement='outside'
      classNames={{
        inputWrapper: ['focus-within:ring-2', 'focus-within:ring-blue-500'],
      }}
      onChange={handleChange}
      {...inputProps}
    />
  )
}

export { InputComponent as Input }
