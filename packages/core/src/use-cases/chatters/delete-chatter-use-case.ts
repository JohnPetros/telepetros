import { ChatterNotFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChattersRepository } from '#interfaces/repositories'

type Request = {
  chatterId: string
}

export class DeleteChatterUseCase implements IUseCase<Request> {
  constructor(private readonly chattersRepository: IChattersRepository) {}

  async execute({ chatterId }: Request): Promise<void> {
    const chatter = await this.chattersRepository.findById(chatterId)
    if (!chatter) throw new ChatterNotFoundError()

    await this.chattersRepository.remove(chatterId)
  }
}
