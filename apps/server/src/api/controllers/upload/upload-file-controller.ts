import { fileStorageProvider } from '@/providers/file-storage-provider'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import type { UploadFolder } from '@telepetros/core/types'

type Params = {
  folder: UploadFolder
}
export class UploadFileController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const file = await http.getFile()

    const { fileUrl, fileId } = await fileStorageProvider.upload(
      http.params.folder,
      file.buffer,
      file.extension,
    )

    return http.send({ fileUrl, fileId })
  }
}
