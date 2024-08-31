import { Chatter } from '#domain/entities'
import type { ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChattersRepository } from '#interfaces/repositories'

type Request = {
  name: string
  chatterDto: ChatterDto
}

export class ListChattersByNameUseCase implements IUseCase<Request, ChatterDto[]> {
  constructor(private readonly repository: IChattersRepository) {}

  async execute({ chatterDto, name }: Request) {
    const chatter = Chatter.create(chatterDto)
    const chatters = await this.repository.findManyByName(name, chatter.id)
    return chatters.map((chatter) => chatter.dto)
  }
}
