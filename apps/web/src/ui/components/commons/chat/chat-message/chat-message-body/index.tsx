import { Image } from '@nextui-org/react'
import type { Attachment } from '@telepetros/core/structs'
import { Icon } from '../../../icon'

type ChatMessageBodyProps = {
  chatterName: string
  text: string
  time: string
  parentMessage?: {
    chatterName: string
    text: string
  } | null
  attachment?: Attachment | null
}

export const ChatMessageBody = ({
  chatterName,
  parentMessage,
  text,
  time,
  attachment,
}: ChatMessageBodyProps) => {
  return (
    <div className='flex flex-col gap-2 min-w-96 max-w-96 p-3 bg-slate-200/45 rounded-xl rounded-es-none'>
      <strong className='text-blue-500 font-semibold text-md'>{chatterName}</strong>
      {parentMessage && (
        <div className='flex items-start gap-1 w-full rounded-md text-sm p-3 bg-slate-200'>
          <Icon name='arrow-right-corner' size={16} />
          <div>
            <strong>{parentMessage.chatterName}</strong>
            <p className='opacity-75'>{parentMessage.text}</p>
          </div>
        </div>
      )}

      <p className='text-sm text-slate-800 font-medium'>{text}</p>

      {attachment && (
        <>
          {attachment?.isImage ? (
            <Image
              src={attachment.fileUrl}
              alt={attachment.name}
              width={360}
              height={240}
            />
          ) : (
            <a
              href={attachment.fileUrl}
              download={attachment.name}
              className='flex flex-col gap-1 p-3 rounded-md bg-slate-200 text-sm'
            >
              <strong>{attachment?.name}</strong>
              <small>{attachment?.roundedSize} Bytes</small>
            </a>
          )}
        </>
      )}
      <time className='block ml-auto text-slate-500 text-xs'>{time}</time>
    </div>
  )
}
