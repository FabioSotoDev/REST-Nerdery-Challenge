import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class UpdateCommentDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  readonly published: boolean
}
