type Folder = 'avatars' | 'attachments'

export interface IFileStorageProvider {
  upload(folder: Folder, fileBuffer: Buffer): Promise<string>
}
