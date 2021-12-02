import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { find } from '../controllers/auth.controller'

const router = express.Router()

export function authRoutes(): Router {
  router.post('/login', (req, res) => {
    res.send(req.body)
  })
  //router.route('/login').get(asyncHandler(find))
  router.route('/signup').post()
  router.route('/refresh').post()
  router.route('/forgot').post()
  router.route('/profile').get()

  return router
}
