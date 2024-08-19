import type { Chatter as PrismaChatter } from '@prisma/client'
import { Chatter } from '@telepetros/core/entities'

export class PrismaChatterMapper {
  toDomain(primasChatter: PrismaChatter): Chatter {
    return Chatter.create({
      id: primasChatter.id,
      name: primasChatter.name,
      email: primasChatter.email,
      avatar: primasChatter.avatar_url,
      banner: primasChatter.banner_url,
    })
  }

  toPrisma(chatter: Chatter): PrismaChatter {
    return {
      id: chatter.id,
      name: chatter.name,
      email: chatter.email,
      banner_url: chatter.banner,
      avatar_url: chatter.avatar,
    }
  }
}
