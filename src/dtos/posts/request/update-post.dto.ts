import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class UpdatePostDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  readonly published: boolean
}
