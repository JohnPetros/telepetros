import type { IApiClient, IUploadService } from '@telepetros/core/interfaces'

export const UploadService = (apiClient: IApiClient): IUploadService => {
  return {
    async saveFile(folder: 'avatars' | 'emoticons' | 'attachments', file: File) {
      const data = new FormData()
      data.set('file', file)

      return await apiClient.sendFile<{ fileUrl: string }>(`/upload/${folder}`, data)
    },

    async fetchFile(url: string, filename: string) {
      return await apiClient.loadFile(url, filename)
    },
  }
}
