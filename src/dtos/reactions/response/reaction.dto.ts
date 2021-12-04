import { Exclude, Expose } from 'class-transformer'
import { PublishType } from '.prisma/client'

@Exclude()
export class ReactionDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly userId: string

  @Expose()
  readonly publishType: PublishType

  @Expose()
  readonly postCommentId: string

  @Expose()
  readonly liked: boolean
}
