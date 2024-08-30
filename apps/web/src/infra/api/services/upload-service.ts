import type { IApiClient, IUploadService } from '@telepetros/core/interfaces'

export const UploadService = (apiClient: IApiClient): IUploadService => {
  return {
    async saveImage(imageType: 'avatar' | 'emote', imageFile: File) {
      const data = new FormData()
      data.set('file', imageFile)

      return await apiClient.sendFile<{ imageUrl: string }>(
        `/upload/image/${imageType}`,
        data,
      )
    },
  }
}
