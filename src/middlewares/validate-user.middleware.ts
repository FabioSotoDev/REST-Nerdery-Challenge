import { NextFunction, Request, Response } from 'express'
import { UsersService } from '../services/users.service'

export const validateSameUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UsersService.findOne(req.params.id)
    if (req.body.user.id === user.id) return next()

    return res
      .status(401)
      .send({ message: 'you are not allowed to update this user information' })
      .end()
  } catch (e) {
    return res.status(404).send({ message: 'user not found' }).end()
  }
}
