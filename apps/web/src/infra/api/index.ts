import { authService, channelsService } from './services'

export function useApi() {
  return {
    authService,
    channelsService,
  }
}
