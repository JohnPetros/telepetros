import type { IApiClient, IUploadService } from '@telepetros/core/interfaces'
import type { UploadFolder } from '@telepetros/core/types'

export const UploadService = (apiClient: IApiClient): IUploadService => {
  return {
    async saveFile(folder: UploadFolder, file: File) {
      const data = new FormData()
      data.set('file', file)

      return await apiClient.sendFile<{ fileUrl: string; fileId: string }>(
        `/upload/${folder}`,
        data,
      )
    },

    async fetchFile(url: string, filename: string) {
      return await apiClient.loadFile(url, filename)
    },
  }
}
