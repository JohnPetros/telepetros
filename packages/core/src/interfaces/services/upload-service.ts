import type { UploadFolder } from '#types'
import type { ApiResponse } from '../../responses'

export interface IUploadService {
  saveFile(
    folder: UploadFolder,
    file: File,
  ): Promise<ApiResponse<{ fileUrl: string; fileId: string }>>
  fetchFile(url: string, filename: string): Promise<ApiResponse<File>>
}
