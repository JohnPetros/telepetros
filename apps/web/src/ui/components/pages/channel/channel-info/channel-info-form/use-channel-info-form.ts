import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { imageSchema, hashSchema, nameSchema } from '@telepetros/validation/schemas'

export const channelInfoFormSchema = z.object({
  banner: imageSchema,
  avatar: imageSchema,
  name: nameSchema,
  inviteCode: hashSchema,
})

type ChannelInfoFormData = z.infer<typeof channelInfoFormSchema>

type UseChannelInfoFormProps = {
  name: string
  inviteCode: string
  avatar: string
  banner: string
}

export const useChannelInfoForm = ({
  name,
  avatar,
  inviteCode,
}: UseChannelInfoFormProps) => {
  const { control, formState, register } = useForm<ChannelInfoFormData>({
    resolver: zodResolver(channelInfoFormSchema),
    defaultValues: {
      name,
      avatar: new File([avatar], 'avatar_image.png', { type: 'image/png' }),
      inviteCode,
    },
  })

  return {
    formControl: control,
    fieldErrors: formState.errors,
    registerField: register,
  }
}
