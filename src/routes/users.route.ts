import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { findCommentUser } from '../controllers/comments.controller'
import { findPostUser } from '../controllers/posts.controller'
import { findOne } from '../controllers/users.controller'

const router = express.Router()

export function userRoutes(): Router {
  router.route('/:userId').get(asyncHandler(findOne))
  router.route('/:userId/posts').get(asyncHandler(findPostUser))
  router.route('/:userId/comments').get(asyncHandler(findCommentUser))
  return router
}
