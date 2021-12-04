import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  create,
  del,
  findCommentPost,
  findOne,
  update,
} from '../controllers/comments.controller'
import {
  setDislikeComment,
  setLikeComment,
} from '../controllers/reactions.controller'
import { protect } from '../middlewares/auth.middleware'
import {
  validateDeleteComment,
  validateOwnerComment,
} from '../middlewares/validate-comment.middleware'

const router = express.Router()

export function commentRoutes(): Router {
  router
    .route('/:postId/comments/')
    .get(asyncHandler(findCommentPost))
    .post(protect, asyncHandler(create))

  router
    .route('/:postId/comments/:id')
    .get(asyncHandler(findOne))
    .patch(protect, validateOwnerComment, asyncHandler(update))
    .delete(protect, validateDeleteComment, asyncHandler(del))

  router
    .route('/:postId/comments/:id/like')
    .post(protect, asyncHandler(setLikeComment))

  router
    .route('/:postId/comments/:id/dislike')
    .post(protect, asyncHandler(setDislikeComment))
  return router
}
