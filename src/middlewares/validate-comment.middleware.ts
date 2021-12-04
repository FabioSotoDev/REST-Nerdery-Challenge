import { NextFunction, Request, Response } from 'express'
import { CommentsService } from '../services/comments.service'

export const validateOwnerComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await CommentsService.findOneComment(req.params.id)
    if (req.body.user.id === comment.userId) return next()

    return res
      .status(401)
      .send({ message: 'you are not allowed to update this comment' })
      .end()
  } catch (e) {
    return res.status(404).send({ message: 'comment not found' }).end()
  }
}

export const validateDeleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await CommentsService.findOneComment(req.params.id)

    if (req.body.user.userType === 'MODERATOR') return next()
    if (req.body.user.id === post.userId) return next()

    return res
      .status(401)
      .send({ message: 'you are not allowed to delete this comment' })
      .end()
  } catch (e) {
    return res.status(404).send({ message: 'comment not found' }).end()
  }
}
