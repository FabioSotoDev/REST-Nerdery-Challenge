import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { signin, signup } from '../controllers/auth.controller'
import { findMe, update } from '../controllers/users.controller'
import { protect } from '../middlewares/auth.middleware'

const router = express.Router()

export function authRoutes(): Router {
  router.route('/signin').post(asyncHandler(signin))
  router.route('/signup').post(asyncHandler(signup))
  router
    .route('/profile')
    .get(protect, asyncHandler(findMe))
    .patch(protect, asyncHandler(update))

  return router
}
