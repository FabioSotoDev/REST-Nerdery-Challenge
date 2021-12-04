import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class CommentDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly userId: string

  @Expose()
  readonly content: string

  @Expose()
  readonly likes: number

  @Expose()
  readonly dislikes: number

  @Expose()
  readonly published: boolean

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
