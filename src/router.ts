import { Router } from 'express'
import { authRoutes } from './routes/auth.route'
import { commentRoutes } from './routes/comments.route'
import { postRoutes } from './routes/posts.route'
import { userRoutes } from './routes/users.route'
//import { usersRoutes } from './routes/users.route'

const expressRouter = Router()

export function router(app: Router): Router {
  //app.use('/api/v1/users', usersRoutes())
  app.use('/accounts', userRoutes())
  app.use('/auth', authRoutes())
  app.use('/posts', postRoutes())
  app.use('/posts', commentRoutes())
  return expressRouter
}
