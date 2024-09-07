import { v2 as Cloudinary } from 'cloudinary'

import type { IFileStorageProvider } from '@telepetros/core/interfaces'

import { ENV } from '@/constants'

export class CloudinaryFileStorageProvider implements IFileStorageProvider {
  private readonly uploader: typeof Cloudinary.uploader

  constructor() {
    Cloudinary.config({
      cloud_name: ENV.cloudinaryCloundName,
      api_secret: ENV.cloudinaryApiSecret,
      api_key: ENV.cloudinaryApiKey,
    })

    this.uploader = Cloudinary.uploader
  }

  async upload(folder: 'avatars' | 'attachments', fileBuffer: Buffer): Promise<string> {
    const data = new Uint8Array(fileBuffer)

    return new Promise((resolve, reject) => {
      this.uploader
        .upload_stream({ folder }, (error, result) => {
        .upload_stream({ folder }, (error, result) => {
          if (error) return reject(error)
          if (result) resolve(result.url)
        })
        .end(data)
    })
  }
}
