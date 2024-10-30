import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  CreateChannelController,
  GetChannelChatController,
  GetChannelController,
  JoinChannelController,
  LeaveChannelController,
  ListChannelMembersController,
  ToggleChannelVisibilityController,
} from '@/api/controllers/channels'
import { ListChatterChannelsController } from '@/api/controllers/channels'
import { FastifyHttp } from '../fastify-http'
import { idSchema } from '@telepetros/validation/schemas'

export const ChannelsRoutes = async (app: FastifyInstance) => {
  const getChannelChatController = new GetChannelChatController()
  const createChannelController = new CreateChannelController()
  const getChannelController = new GetChannelController()
  const listChatterChannelsController = new ListChatterChannelsController()
  const joinChannelController = new JoinChannelController()
  const toggleChannelVisibilityController = new ToggleChannelVisibilityController()
  const listChannelMembersController = new ListChannelMembersController()
  const leaveChannelController = new LeaveChannelController()

  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/:channelId/chat',
      {
        schema: {
          params: z.object({
            channelId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return getChannelChatController.handle(http)
      },
    )
    .get(
      '/:channelId',
      {
        schema: {
          params: z.object({
            channelId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return listChannelMembersController.handle(http)
      },
    )
    .get(
      '/:channelId/members',
      {
        schema: {
          params: z.object({
            channelId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return getChannelController.handle(http)
      },
    )
    .post(
      '/join',
      {
        schema: {
          body: z.object({
            inviteCode: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return joinChannelController.handle(http)
      },
    )
    .put(
      '/:channelId/visibility',
      {
        schema: {
          body: z.object({
            isChannelPublic: z.boolean(),
          }),
          params: z.object({
            channelId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body, typeof request.params>(
          request,
          response,
        )
        return toggleChannelVisibilityController.handle(http)
      },
    )
    .get(
      '/chatter/:chatterId',
      {
        schema: {
          params: z.object({
            chatterId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return listChatterChannelsController.handle(http)
      },
    )
    .post(
      '/',
      {
        schema: {
          body: z.object({
            ownerId: idSchema,
            name: z.string(),
            avatar: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return createChannelController.handle(http)
      },
    )
    .delete(
      '/:channelId/:chatterId',
      {
        schema: {
          params: z.object({
            channelId: idSchema,
            chatterId: idSchema,
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return leaveChannelController.handle(http)
      },
    )
}
