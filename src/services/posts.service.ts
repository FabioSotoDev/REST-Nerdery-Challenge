import { Post, Prisma } from '@prisma/client'
import createError from 'http-errors'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto'
import { prisma } from '../server'

export class PostsService {
  static async find(): Promise<Post[]> {
    return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: CreatePostDto): Promise<Post> {
    return prisma.post.create({ data: input })
  }

  static async findOnePost(id: string): Promise<Post> {
    return prisma.post.findUnique({ where: { id } })
  }

  static async findPostFromUser(userId: string): Promise<Post[]> {
    return prisma.post.findMany({ where: { userId } })
  }

  static async update(id: string, input: UpdatePostDto): Promise<Post> {
    try {
      const post = await prisma.post.update({
        data: input,
        where: {
          id: id,
        },
      })

      return post
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new createError.UnprocessableEntity('cannot update post')
      }
      throw error
    }
  }

  static async del(id: string): Promise<Post> {
    return prisma.post.delete({ where: { id } })
  }
}
