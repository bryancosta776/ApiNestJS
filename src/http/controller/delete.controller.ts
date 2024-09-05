import { Body, Controller, Delete, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Controller()
export class DeleteUserController {
  constructor(private prismaClient: PrismaClient) {}

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.prismaClient.user.delete({where: {id}})

  }
}