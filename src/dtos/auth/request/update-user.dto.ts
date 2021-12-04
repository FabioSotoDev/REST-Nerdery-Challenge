import { Expose, Exclude } from 'class-transformer'
import { IsString, IsBoolean, IsOptional } from 'class-validator'
import { BaseDto } from '../../base.dto'
import { UserType } from '.prisma/client'

@Exclude()
export class UpdateUserDto extends BaseDto {
  @Expose()
  @IsString()
  @IsOptional()
  readonly name: string

  @Expose()
  @IsBoolean()
  @IsOptional()
  readonly isNameVisible: boolean

  @Expose()
  @IsBoolean()
  @IsOptional()
  readonly isEmailVisible: boolean

  @Expose()
  @IsString()
  @IsOptional()
  readonly userType: UserType
}
