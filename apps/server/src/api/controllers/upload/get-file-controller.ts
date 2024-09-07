import { FileStorageProvider } from '@/providers/file-storage-provider'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  folder: string
  filename: string
}

export class GetFileController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const fileStorageProvider = new FileStorageProvider()

    const response = await fetch(
      'https://res.cloudinary.com/dswcdkj9c/image/upload/attachments/oricvhkqa4epjxjbacys',
    )
    const data = await response.blob()
    console.log(response.status)
    const file = new File([data], 'pdf', { type: data.type })
    console.log(file)

    return http.send({
      file: 'https://res.cloudinary.com/dswcdkj9c/image/upload/attachments/oricvhkqa4epjxjbacys',
    })
  }
}
