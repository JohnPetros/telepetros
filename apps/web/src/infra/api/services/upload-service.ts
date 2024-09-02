import type { IApiClient, IUploadService } from '@telepetros/core/interfaces'

export const UploadService = (apiClient: IApiClient): IUploadService => {
  return {
    async saveImage(imageType: 'avatars' | 'emoticons', imageFile: File) {
      const data = new FormData()
      data.set('file', imageFile)

      return await apiClient.sendFile<{ imageUrl: string }>(
        `/upload/image/${imageType}`,
        data,
      )
    },

    async fetchFile(url: string, filename: string) {
      return await apiClient.loadFile(url, filename)
    },
  }
}
