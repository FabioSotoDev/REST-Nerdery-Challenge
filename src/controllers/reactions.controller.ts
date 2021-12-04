import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { PostDto } from '../dtos/posts/response/post.dto'
import { CreateReactionDto } from '../dtos/reactions/request/create-reaction.dto'
import { ReactionDto } from '../dtos/reactions/response/reaction.dto'
import { ReactionsService } from '../services/reactions.service'
import { CommentDto } from '../dtos/comments/response/comment.dto'
import { Comment, Post, UserLike } from '.prisma/client'

export async function findLikes(req: Request, res: Response): Promise<void> {
  const post = await ReactionsService.findUserPostLikes(req.body.userId)

  res.status(200).json(plainToClass(PostDto, post))
}

export async function createPostLike(
  userId: string,
  id: string,
): Promise<[UserLike, Post]> {
  const dto = plainToClass(CreateReactionDto, {
    userId: userId,
    publishType: 'POST',
    postCommentId: id,
    liked: true,
  })
  await dto.isValid()

  return ReactionsService.create(dto)
}

export async function createPostDislike(
  userId: string,
  id: string,
): Promise<[UserLike, Post]> {
  const dto = plainToClass(CreateReactionDto, {
    userId: userId,
    publishType: 'POST',
    postCommentId: id,
    liked: false,
  })
  await dto.isValid()

  return ReactionsService.create(dto)
}

export async function createCommentLike(
  userId: string,
  id: string,
): Promise<[UserLike, Comment]> {
  const dto = plainToClass(CreateReactionDto, {
    userId: userId,
    publishType: 'COMMENT',
    postCommentId: id,
    liked: true,
  })
  await dto.isValid()

  return ReactionsService.create(dto)
}

export async function createCommentDislike(
  userId: string,
  id: string,
): Promise<[UserLike, Comment]> {
  const dto = plainToClass(CreateReactionDto, {
    userId: userId,
    publishType: 'COMMENT',
    postCommentId: id,
    liked: false,
  })
  await dto.isValid()

  return ReactionsService.create(dto)
}

export async function setLikePost(req: Request, res: Response): Promise<void> {
  try {
    const match = await ReactionsService.matchUserLike(
      req.body.userId,
      req.params.id,
    )
    if (match.liked) {
      res.status(401).send({ message: 'Post Already Liked' })
    } else {
      const [reaction, post] = await ReactionsService.setLikePost(
        match.id,
        match.postCommentId,
      )
      const reacdto = plainToClass(ReactionDto, reaction)
      const postdto = plainToClass(PostDto, post)
      res.status(201).send({ reacdto, postdto, message: 'Post Liked Updated' })
    }
  } catch (error) {
    const [reaction, post] = await createPostLike(
      req.body.userId,
      req.params.id,
    )
    const reacdto = plainToClass(ReactionDto, reaction)
    const postdto = plainToClass(PostDto, post)
    res.status(201).send({ reacdto, postdto, message: 'Post Liked Created' })
  }
}

export async function setDislikePost(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const match = await ReactionsService.matchUserLike(
      req.body.userId,
      req.params.id,
    )
    if (!match.liked) {
      res.status(401).send({ message: 'Post Already Disliked' })
    } else {
      const [reaction, post] = await ReactionsService.setDislikePost(
        match.id,
        match.postCommentId,
      )
      const reacdto = plainToClass(ReactionDto, reaction)
      const postdto = plainToClass(PostDto, post)
      res
        .status(201)
        .send({ reacdto, postdto, message: 'Post Disliked Updated' })
    }
  } catch (error) {
    const [reaction, post] = await createPostLike(
      req.body.userId,
      req.params.id,
    )
    const reacdto = plainToClass(ReactionDto, reaction)
    const postdto = plainToClass(PostDto, post)
    res.status(201).send({ reacdto, postdto, message: 'Post Disliked Created' })
  }
}

export async function setLikeComment(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const match = await ReactionsService.matchUserLike(
      req.body.userId,
      req.params.id,
    )
    if (match.liked) {
      res.status(401).send({ message: 'Comment Already Liked' })
    } else {
      const [reaction, comment] = await ReactionsService.setLikeComment(
        match.id,
        match.postCommentId,
      )
      const reacdto = plainToClass(ReactionDto, reaction)
      const commentdto = plainToClass(CommentDto, comment)
      res
        .status(201)
        .send({ reacdto, commentdto, message: 'Comment Liked Updated' })
    }
  } catch (error) {
    const [reaction, comment] = await createCommentLike(
      req.body.userId,
      req.params.id,
    )
    const reacdto = plainToClass(ReactionDto, reaction)
    const commentdto = plainToClass(CommentDto, comment)
    res
      .status(201)
      .send({ reacdto, commentdto, message: 'Comment Liked Created' })
  }
}

export async function setDislikeComment(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const match = await ReactionsService.matchUserLike(
      req.body.userId,
      req.params.id,
    )
    if (!match.liked) {
      res.status(401).send({ message: 'Comment Already Disliked' })
    } else {
      const [reaction, comment] = await ReactionsService.setDislikeComment(
        match.id,
        match.postCommentId,
      )
      const reacdto = plainToClass(ReactionDto, reaction)
      const commentdto = plainToClass(CommentDto, comment)
      res
        .status(201)
        .send({ reacdto, commentdto, message: 'Comment Disliked Updated' })
    }
  } catch (error) {
    const [reaction, comment] = await createCommentDislike(
      req.body.userId,
      req.params.id,
    )
    const reacdto = plainToClass(ReactionDto, reaction)
    const commentdto = plainToClass(CommentDto, comment)
    res
      .status(201)
      .send({ reacdto, commentdto, message: 'Comment Disliked Created' })
  }
}
