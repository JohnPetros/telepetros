import type { ApiResponse } from '../../responses'

export interface IUploadService {
  saveImage(
    imageType: 'avatar' | 'emote',
    imageFile: File,
  ): Promise<ApiResponse<{ imageUrl: string }>>
}
