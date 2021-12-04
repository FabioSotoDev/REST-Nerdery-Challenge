import { prisma } from '../server'
import { CreateReactionDto } from '../dtos/reactions/request/create-reaction.dto'
import { PostsService } from './posts.service'
import { Comment, Post, UserLike } from '.prisma/client'

export class ReactionsService {
  static async findOneReaction(id: string): Promise<UserLike> {
    return prisma.userLike.findUnique({ where: { id } })
  }

  static async matchUserLike(
    userId: string,
    postCommentId: string,
  ): Promise<UserLike> {
    return prisma.userLike.findFirst({
      where: { userId: userId, postCommentId: postCommentId },
    })
  }

  static async findUserPostLikes(userId: string): Promise<Post[]> {
    const userLikes = await prisma.userLike.findMany({ where: { userId } })
    const posts: Post[] = []
    userLikes.forEach(async (element) => {
      posts.push(await PostsService.findOnePost(element.postCommentId))
    })
    return posts
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async create(input: CreateReactionDto): Promise<[UserLike, any]> {
    const publishType = input.publishType
    const liked = input.liked
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any
    if (publishType === 'POST') {
      if (liked) {
        query = prisma.post.update({
          where: { id: input.postCommentId },
          data: { likes: { increment: 1 } },
        })
      } else {
        query = prisma.post.update({
          where: { id: input.postCommentId },
          data: { dislikes: { increment: 1 } },
        })
      }
    } else {
      if (liked) {
        query = prisma.comment.update({
          where: { id: input.postCommentId },
          data: { likes: { increment: 1 } },
        })
      } else {
        query = prisma.comment.update({
          where: { id: input.postCommentId },
          data: { dislikes: { increment: 1 } },
        })
      }
    }
    const result = prisma.$transaction([
      prisma.userLike.create({ data: input }),
      query,
    ])
    return result
  }

  static async setLikePost(
    id: string,
    postId: string,
  ): Promise<[UserLike, Post]> {
    return prisma.$transaction([
      prisma.userLike.update({
        data: { liked: { set: true } },
        where: { id: id },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 }, dislikes: { decrement: 1 } },
      }),
    ])
  }
  static async setDislikePost(
    id: string,
    postId: string,
  ): Promise<[UserLike, Post]> {
    return prisma.$transaction([
      prisma.userLike.update({
        data: { liked: { set: false } },
        where: { id: id },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { likes: { decrement: 1 }, dislikes: { increment: 1 } },
      }),
    ])
  }

  static async setLikeComment(
    id: string,
    commentId: string,
  ): Promise<[UserLike, Comment]> {
    return prisma.$transaction([
      prisma.userLike.update({
        data: { liked: { set: true } },
        where: { id: id },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: { likes: { increment: 1 }, dislikes: { decrement: 1 } },
      }),
    ])
  }

  static async setDislikeComment(
    id: string,
    commentId: string,
  ): Promise<[UserLike, Comment]> {
    return prisma.$transaction([
      prisma.userLike.update({
        data: { liked: { set: false } },
        where: { id: id },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: { likes: { decrement: 1 }, dislikes: { increment: 1 } },
      }),
    ])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async del(id: string): Promise<[UserLike, any]> {
    const reaction = await this.findOneReaction(id)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any
    if (reaction.publishType === 'POST') {
      if (reaction.liked) {
        query = prisma.post.update({
          where: { id: reaction.postCommentId },
          data: { likes: { decrement: 1 } },
        })
      } else {
        query = prisma.post.update({
          where: { id: reaction.postCommentId },
          data: { dislikes: { decrement: 1 } },
        })
      }
    } else {
      if (reaction.liked) {
        query = prisma.comment.update({
          where: { id: reaction.postCommentId },
          data: { likes: { decrement: 1 } },
        })
      } else {
        query = prisma.comment.update({
          where: { id: reaction.postCommentId },
          data: { dislikes: { decrement: 1 } },
        })
      }
    }
    const result = prisma.$transaction([
      prisma.userLike.delete({ where: { id: id } }),
      query,
    ])
    return result
  }
}
