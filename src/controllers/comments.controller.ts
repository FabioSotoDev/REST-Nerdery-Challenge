import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { CommentDto } from '../dtos/comments/response/comment.dto'
import { CommentsService } from '../services/comments.service'

export async function find(req: Request, res: Response): Promise<void> {
  const comments = await CommentsService.find()

  res.status(200).json(plainToClass(CommentDto, comments))
}

export async function create(req: Request, res: Response): Promise<void> {
  req.body.postId = req.params.postId
  const dto = plainToClass(CreateCommentDto, req.body)
  await dto.isValid()
  const comment = await CommentsService.create(dto)

  res.status(201).json(plainToClass(CommentDto, comment))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  try {
    const comment = await CommentsService.findOneComment(req.params.id)
    res.status(200).json(plainToClass(CommentDto, comment))
  } catch (e) {
    res.status(404).send({ message: 'Comment not found' }).end()
  }
}

export async function findCommentPost(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const post = await CommentsService.findCommentsFromPost(req.params.postId)
    res.status(200).json(plainToClass(CommentDto, post))
  } catch (e) {
    res.status(404).send({ message: 'Comments not found' }).end()
  }
}

export async function findCommentUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const post = await CommentsService.findCommentsFromUser(req.params.userId)
    res.status(200).json(plainToClass(CommentDto, post))
  } catch (e) {
    res.status(404).send({ message: 'Comments not found' }).end()
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateCommentDto, req.body)
  await dto.isValid()

  try {
    const comment = await CommentsService.update(req.params.id, dto)
    res.status(200).json(plainToClass(CommentDto, comment))
  } catch (e) {
    res.status(404).send({ message: 'Comment not found' }).end()
  }
}

export async function del(req: Request, res: Response): Promise<void> {
  const comment = await CommentsService.del(req.params.id)

  res.status(200).send({ message: 'Comment Deleted', comment })
}
