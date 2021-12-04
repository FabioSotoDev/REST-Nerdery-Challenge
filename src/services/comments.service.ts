import { Prisma, Comment } from '@prisma/client'
import createError from 'http-errors'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { prisma } from '../server'

export class CommentsService {
  static async find(): Promise<Comment[]> {
    return prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: CreateCommentDto): Promise<Comment> {
    return prisma.comment.create({ data: input })
  }

  static async findOneComment(id: string): Promise<Comment> {
    return prisma.comment.findUnique({ where: { id } })
  }

  static async findCommentsFromPost(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { postId } })
  }

  static async findCommentsFromUser(userId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { userId } })
  }

  static async update(id: string, input: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await prisma.comment.update({
        data: input,
        where: {
          id: id,
        },
      })

      return comment
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new createError.UnprocessableEntity('cannot update comment')
      }
      throw error
    }
  }

  static async del(id: string): Promise<Comment> {
    return prisma.comment.delete({ where: { id } })
  }
}
