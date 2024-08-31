type LastMessageProps = {
  text: string
  sentAt: Date
}

export const LastMessage = ({ text, sentAt }: LastMessageProps) => {
  return (
    <div className='w-48'>
      <p className='truncate text-slate-300'>{text}</p>
      <time className=' text-slate-300'>{sentAt.toDateString()}</time>
    </div>
  )
}
