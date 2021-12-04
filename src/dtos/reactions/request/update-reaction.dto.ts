import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class UpdateReactionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly id: string

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  readonly liked: boolean
}
