import type { ApiResponse } from '../../responses'

export interface IUploadService {
  saveImage(
    imageType: 'avatars' | 'emoticons',
    imageFile: File,
  ): Promise<ApiResponse<{ imageUrl: string }>>
  fetchFile(url: string, filename: string): Promise<ApiResponse<File>>
}
