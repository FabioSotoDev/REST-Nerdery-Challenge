import { NextFunction, Request, Response } from 'express'
import { UsersService } from '../services/users.service'
import { verifyToken } from '../controllers/auth.controller'

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any

  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await UsersService.findOne(payload.id)

  if (!user) {
    return res.status(401).end()
  }
  req.body.user = user
  req.body.userId = user.id
  next()
}
