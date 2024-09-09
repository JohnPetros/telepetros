import type { ChannelDto } from '@telepetros/core/dtos'

import { ChannelInfo } from './channel-info'
import { ChannelHeader } from './channel-header'
import { ChannelVisibility } from './channel-visibility'

type ChannelPageProps = {
  channelDto: ChannelDto
}

export const ChannelSettingsPage = ({ channelDto }: ChannelPageProps) => {
  return (
    <div>
      {channelDto.id && (
        <>
          <ChannelHeader channelId={channelDto.id} />
          <div className='space-y-12 p-6'>
            <ChannelInfo channelDto={channelDto} />
            <ChannelVisibility
              defaultVisibility={Boolean(channelDto.isPublic)}
              channelId={channelDto.id}
              inviteCode={channelDto.inviteCode}
            />
          </div>
        </>
      )}
    </div>
  )
}
