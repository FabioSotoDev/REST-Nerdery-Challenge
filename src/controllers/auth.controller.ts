import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UsersService } from '../services/users.service'
import { SignUpDto } from '../dtos/auth/request/sign-up.dto'
import config from '../config/config'
import { User } from '.prisma/client'

const saltRounds = 10

export const newToken = (user: User) => {
  return jwt.sign({ id: user.id }, config.key, { expiresIn: '365d' })
}

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.key, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

export const signup = async (req: Request, res: Response) => {
  if (req.body.password != req.body.confirmPassword) {
    return res.status(400).send({ message: 'Incorrect confirm password' })
  }
  const dto = plainToClass(SignUpDto, req.body)
  try {
    await dto.isValid()
  } catch {
    return res.status(403).send({ message: 'Missing values' })
  }

  try {
    dto.password = bcrypt.hashSync(dto.password, saltRounds)
    const prismaUser = await UsersService.create(dto)
    const token = newToken(prismaUser)
    return res.status(201).send({ user: prismaUser, token: token })
  } catch (error) {
    return res.status(403).send({ message: 'Email already taken' })
  }
}

export const checkPassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed as string)
}

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await UsersService.findOneEmail(req.body.email)
    const match: boolean = await checkPassword(req.body.password, user.password)
    if (!match) {
      return res.status(401).send({ message: 'email or password incorrect' })
    }
    const token = newToken(user)
    return res.status(201).send({ token: token })
  } catch (e) {
    return res.status(404).send({ message: 'user not found' })
  }
}
