import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto'
import { PostDto } from '../dtos/posts/response/post.dto'
import { PostsService } from '../services/posts.service'

export async function find(req: Request, res: Response): Promise<void> {
  const posts = await PostsService.find()

  res.status(200).json(plainToClass(PostDto, posts))
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreatePostDto, req.body)
  await dto.isValid()
  const post = await PostsService.create(dto)

  res.status(201).json(plainToClass(PostDto, post))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  try {
    const post = await PostsService.findOnePost(req.params.id)
    res.status(200).json(plainToClass(PostDto, post))
  } catch (e) {
    res.status(404).send({ message: 'Post not found' }).end()
  }
}

export async function findPostUser(req: Request, res: Response): Promise<void> {
  try {
    const post = await PostsService.findPostFromUser(req.params.userId)
    res.status(200).json(plainToClass(PostDto, post))
  } catch (e) {
    res.status(404).send({ message: 'Posts not found' }).end()
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdatePostDto, req.body)
  await dto.isValid()

  try {
    const post = await PostsService.update(req.params.id, dto)
    res.status(200).json(plainToClass(PostDto, post))
  } catch (e) {
    res.status(404).send({ message: 'Post not found' }).end()
  }
}

export async function del(req: Request, res: Response): Promise<void> {
  const post = await PostsService.del(req.params.id)

  res.status(200).send({ message: 'Post Deleted', post })
}
