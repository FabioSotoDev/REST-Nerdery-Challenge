import { Expose, Exclude } from 'class-transformer'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class CreateCommentDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly postId: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string
}
