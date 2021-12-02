import { Router } from 'express'
import { authRoutes } from './routes/auth.route'
//import { usersRoutes } from './routes/users.route'

const expressRouter = Router()

export function router(app: Router): Router {
  //app.use('/api/v1/users', usersRoutes())
  app.use('/auth', authRoutes())

  return expressRouter
}
