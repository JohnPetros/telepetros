import { v2 as Cloudinary } from 'cloudinary'

import type { IFileStorageProvider } from '@telepetros/core/interfaces'
import type { UploadFolder } from '@telepetros/core/types'

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

  async upload(
    folder: UploadFolder,
    fileBuffer: Buffer,
  ): Promise<{ fileUrl: string; fileId: string }> {
    // const data = new Uint8Array(fileBuffer)

    // return new Promise((resolve, reject) => {
    //   this.uploader
    //     .upload_stream({ folder }, (error, result) => {
    //       if (error) return reject(error)
    //       if (result) resolve(result.url)
    //     })
    //     .end(data)
    // })
    throw new Error()
  }

  remove(fileId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
