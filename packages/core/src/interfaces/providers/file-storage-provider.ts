type Folder = 'avatars' | 'attachments'

export interface IFileStorageProvider {
  upload(
    folder: Folder,
    fileBuffer: Buffer,
    fileExtension: string,
  ): Promise<{ fileUrl: string; fileId: string }>
  remove(fileId: string): Promise<void>
}
