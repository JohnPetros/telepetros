import { FileStorageProvider } from '@/providers/file-storage-provider'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import type { UploadFolder } from '@telepetros/core/types'

type Params = {
  folder: UploadFolder
}
export class UploadFileController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const file = await http.getFile()

    const fileStorageProvider = new FileStorageProvider()

    const fileUrl = await fileStorageProvider.upload(http.params.folder, file)

    return http.send({ fileUrl })
  }
}
