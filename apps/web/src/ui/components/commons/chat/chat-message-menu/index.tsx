import { Button } from '@nextui-org/react'

import { Popover } from '../../popover'
import { Icon } from '../../icon'

type ChatMessageMenuProps = {
  onClickDelete: () => void
  onClickEdit: () => void
  onClickCopy: () => void
  onClickReply: () => void
}

export const ChatMessageMenu = ({
  onClickCopy,
  onClickEdit,
  onClickReply,
  onClickDelete,
}: ChatMessageMenuProps) => {
  return (
    <>
      <Popover
        trigger={
          <Button isIconOnly size='sm' className='bg-slate-200'>
            <Icon name='ellipsis' size={16} />
          </Button>
        }
      >
        <ul className='space-y-2'>
          <li>
            <Button
              startContent={<Icon name='reply' size={16} />}
              size='sm'
              fullWidth
              className='bg-slate-50 text-slate-700 hover:bg-blue-700 hover:text-slate-50'
              onClick={onClickReply}
            >
              Reply
            </Button>
          </li>
          <li>
            <Button
              startContent={<Icon name='copy' size={16} />}
              size='sm'
              fullWidth
              className='bg-slate-50 text-slate-700 hover:bg-blue-700 hover:text-slate-50'
              onClick={onClickCopy}
            >
              Copy
            </Button>
          </li>
          <li>
            <Button
              startContent={<Icon name='edit' size={16} />}
              size='sm'
              fullWidth
              className='bg-slate-50 text-slate-700 hover:bg-blue-700 hover:text-slate-50'
              onClick={onClickEdit}
            >
              Edit
            </Button>
          </li>
          <li>
            <Button
              startContent={<Icon name='trash' size={16} />}
              size='sm'
              fullWidth
              className='bg-slate-50 text-red-700 hover:bg-red-700 hover:text-slate-50'
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </li>
        </ul>
      </Popover>
    </>
  )
}
