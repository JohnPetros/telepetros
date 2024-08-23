import { authService, channelsService, chattersService } from './services'

export function useApi() {
  return {
    authService,
    channelsService,
    chattersService,
  }
}
