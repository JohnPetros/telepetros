import { FileStorageProvider } from '@/providers/file-storage-provider'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  imageType: string
}

export class UploadImageController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const imageFile = await http.getImageFile()

    const fileStorageProvider = new FileStorageProvider()

    const imageUrl = await fileStorageProvider.upload('avatars', imageFile)

    return http.send({ imageUrl })
  }
}
