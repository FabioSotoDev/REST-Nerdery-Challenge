import { Exclude, Expose, Transform } from 'class-transformer'
import { UserType } from '.prisma/client'

@Exclude()
export class UserDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly email: string

  @Expose()
  readonly isNameVisible: boolean

  @Expose()
  readonly isEmailVisible: boolean

  @Expose()
  readonly userType: UserType

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}
