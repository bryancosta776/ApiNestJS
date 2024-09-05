import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { LogMiddleware } from './middleware/log.middleware';


@Module({
  imports: [DatabaseModule, HttpModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes('*'); // Aplica a todos os endpoints
  }
}