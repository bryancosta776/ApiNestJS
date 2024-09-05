import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/zod-validation';
import { z } from 'zod'
import { hash } from 'bcryptjs'




@Controller()
export class GetUserController {
  constructor(private prismaClient: PrismaClient) {}

  @Get('/read')
  findAll() {
    return this.prismaClient.user.findMany();
  }

  }
