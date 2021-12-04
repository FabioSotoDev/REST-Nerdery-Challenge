import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  create,
  del,
  find,
  findOne,
  update,
} from '../controllers/posts.controller'
import {
  setDislikePost,
  setLikePost,
} from '../controllers/reactions.controller'
import { protect } from '../middlewares/auth.middleware'
import {
  validateDeletePost,
  validateOwnerPost,
} from '../middlewares/validate-post.middleware'

const router = express.Router()

export function postRoutes(): Router {
  router.route('/').get(asyncHandler(find)).post(protect, asyncHandler(create))

  router
    .route('/:id')
    .get(asyncHandler(findOne))
    .patch(protect, validateOwnerPost, asyncHandler(update))
    .delete(protect, validateDeletePost, asyncHandler(del))

  router.route('/:id/like').post(protect, asyncHandler(setLikePost))
  router.route('/:id/dislike').post(protect, asyncHandler(setDislikePost))

  return router
}
