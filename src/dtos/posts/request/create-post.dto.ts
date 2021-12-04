import { Expose, Exclude } from 'class-transformer'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class CreatePostDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string
}
