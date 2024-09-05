import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ZodValidationPipe } from '../../../src/pipes/zod-validation';
import { z } from 'zod'
import { hash } from 'bcryptjs'



const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateUserSchema = z.infer<typeof createUserSchema>

@Controller()
export class CreateUserController {
  constructor(private prismaClient: PrismaClient) {}

  @Post('/create')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: CreateUserSchema) {
    const {name, email, password } = body

    const hashedPassword = await hash(password, 8)

    const userCreate = await this.prismaClient.user.create({
       data: {
        name,
        email,
        password: hashedPassword
       }
    })

    return {userCreate}

  }
}