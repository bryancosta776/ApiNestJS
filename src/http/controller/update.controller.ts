import { Body, Controller, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod'




const editedUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()

})

type EditedUserSchema = z.infer<typeof editedUserSchema>

@Controller()
export class UpdateUserController {
    constructor(private readonly prismaClient: PrismaClient) {}

    @Patch('/update/:id')
    async updateUser(
      @Param('id') id: string,
      @Body() editedUserSchema: EditedUserSchema
    ) {
      
      const user = await this.prismaClient.user.findUnique({
        where: { id }, 
      });
  
      
      if (!user) {
        throw new Error('User does not exist.');
      }
  
      const updatedUser = await this.prismaClient.user.update({
        where: { id },
        data: editedUserSchema, 
      });
  
      return updatedUser;
    }
}