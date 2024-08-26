import type { IUseCase } from '#interfaces/handlers'
import type { IChattersRepository } from '#interfaces/repositories'
import { ChatterNotFoundError } from '../../errors'

export class ConnectChatterUseCase implements IUseCase<string, void> {
  constructor(private readonly chattersRepository: IChattersRepository) {}

  async execute(chatterId: string) {
    const chatter = await this.chattersRepository.findById(chatterId)

    if (!chatter) throw new ChatterNotFoundError()

    chatter.connect()

    await this.chattersRepository.updateChatter(chatter)
  }
}
