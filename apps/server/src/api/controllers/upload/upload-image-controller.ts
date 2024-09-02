import type { IController, IHttp } from '@telepetros/core/interfaces'

import { FileStorageProvider } from '@/providers/file-storage-provider'

type Params = {
  imageType: 'avatars' | 'emoticons'
}

export class UploadImageController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const imageFile = await http.getImageFile()

    const fileStorageProvider = new FileStorageProvider()

    const imageUrl = await fileStorageProvider.upload(http.params.imageType, imageFile)

    return http.send({ imageUrl })
  }
}
