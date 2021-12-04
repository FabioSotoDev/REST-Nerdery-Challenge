import { Prisma, User } from '@prisma/client'
import createError from 'http-errors'
import { SignUpDto } from '../dtos/auth/request/sign-up.dto'
import { UpdateUserDto } from '../dtos/auth/request/update-user.dto'
import { prisma } from '../server'

export class UsersService {
  static async find(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: SignUpDto): Promise<User> {
    if (await prisma.user.count({ where: { email: input.email } })) {
      throw new createError.UnprocessableEntity('email already taken')
    }

    return prisma.user.create({ data: input })
  }

  static async findOne(id: string): Promise<User> {
    return prisma.user.findUnique({ where: { id } })
  }

  static async findOneEmail(email: string): Promise<User> {
    return prisma.user.findUnique({ where: { email } })
  }

  static async update(uuid: string, input: UpdateUserDto): Promise<User> {
    try {
      const user = await prisma.user.update({
        data: input,
        where: {
          id: uuid,
        },
      })

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new createError.UnprocessableEntity('email already taken')
        }
      }

      throw error
    }
  }
}
