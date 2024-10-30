import type { ChannelDto } from '@telepetros/core/dtos'
import { Channel } from '@telepetros/core/entities'
import { useState } from 'react'

export function useChannelInfo(channelDto: ChannelDto) {
  const [channel, setChannel] = useState(Channel.create(channelDto))

  return {
    channel,
  }
}
