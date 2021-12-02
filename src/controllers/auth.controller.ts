import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'

export async function find(req: Request, res: Response): Promise<void> {
  res.status(200)
}
