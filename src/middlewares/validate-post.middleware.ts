import { NextFunction, Request, Response } from 'express'
import { PostsService } from '../services/posts.service'

export const validateOwnerPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await PostsService.findOnePost(req.params.id)
    if (req.body.user.id === post.userId) return next()

    return res
      .status(401)
      .send({ message: 'you are not allowed to update this post' })
      .end()
  } catch (e) {
    return res.status(404).send({ message: 'post not found' }).end()
  }
}

export const validateDeletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await PostsService.findOnePost(req.params.id)

    if (req.body.user.userType === 'MODERATOR') return next()
    if (req.body.user.id === post.userId) return next()

    return res
      .status(401)
      .send({ message: 'you are not allowed to delete this post' })
      .end()
  } catch (e) {
    return res.status(404).send({ message: 'post not found' }).end()
  }
}
