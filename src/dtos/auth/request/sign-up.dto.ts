import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class SignUpDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @Expose()
  @IsEmail()
  readonly email: string

  @Expose()
  @IsString()
  @Length(6, 20)
  password: string
}
