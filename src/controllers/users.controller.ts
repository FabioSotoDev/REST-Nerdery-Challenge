import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { SignUpDto } from '../dtos/auth/request/sign-up.dto'
import { UpdateUserDto } from '../dtos/auth/request/update-user.dto'
import { UserDto } from '../dtos/auth/response/user.dto'
import { UsersService } from '../services/users.service'

export async function find(req: Request, res: Response): Promise<void> {
  const users = await UsersService.find()

  res.status(200).json(plainToClass(UserDto, users))
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(SignUpDto, req.body)
  await dto.isValid()

  const user = await UsersService.create(dto)

  res.status(201).json(plainToClass(UserDto, user))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const user = await UsersService.findOne(req.params.userId)

  res.status(200).json(plainToClass(UserDto, user))
}

export async function findMe(req: Request, res: Response): Promise<void> {
  const user = await UsersService.findOne(req.body.userId)

  res.status(200).json(plainToClass(UserDto, user))
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateUserDto, req.body)
  await dto.isValid()

  const user = await UsersService.update(req.body.userId, dto)

  res.status(200).json(plainToClass(UserDto, user))
}
