import type { ApiResponse } from '../../responses'

export interface IUploadService {
  saveFile(
    folder: 'avatars' | 'emoticons' | 'attachments',
    file: File,
  ): Promise<ApiResponse<{ fileUrl: string }>>
  fetchFile(url: string, filename: string): Promise<ApiResponse<File>>
}
