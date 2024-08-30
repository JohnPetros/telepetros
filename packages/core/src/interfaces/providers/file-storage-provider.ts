export interface IFileStorageProvider {
  upload(fileBuffer: Buffer): Promise<string>
}
