import { Module } from "@nestjs/common";
import { CreateUserController } from "./controller/create.controller";
import { DatabaseModule } from "../../src/database/database.module";
import { PrismaService } from "../../src/database/prisma.service";
import { PrismaClient } from "@prisma/client";
import { DeleteUserController } from "./controller/delete.controller";
import { UpdateUserController } from "./controller/update.controller";
import { GetUserController } from "./controller/read.controller";
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";


@Module({
    imports: [DatabaseModule],
    controllers: [CreateUserController, DeleteUserController, UpdateUserController, GetUserController],
    providers: [PrismaService, PrismaClient, {
        provide: APP_GUARD,
        useClass: AuthGuard,
      }]

  })
  export class HttpModule {}