import { FileStorageProvider } from '@/providers/file-storage-provider'
import type { IController, IHttp } from '@telepetros/core/interfaces'

export class UploadFileController implements IController {
  async handle(http: IHttp) {
    const file = await http.getFile()

    const fileStorageProvider = new FileStorageProvider()

    const fileUrl = await fileStorageProvider.upload('attachments', file)

    return http.send({ fileUrl })
  }
}
