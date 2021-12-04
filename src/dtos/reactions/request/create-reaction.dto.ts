import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { BaseDto } from '../../base.dto'
import { PublishType } from '.prisma/client'

@Exclude()
export class CreateReactionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string

  @Expose()
  @IsNotEmpty()
  readonly publishType: PublishType

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly postCommentId: string

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  readonly liked: boolean
}
