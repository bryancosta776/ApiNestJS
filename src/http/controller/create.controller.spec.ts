import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import * as request from 'supertest';

import { AppModule } from "../../../src/app.module"
import { PrismaService } from "../../../src/database/prisma.service"



describe('create user', () => {
    let prisma = PrismaService
    let app: INestApplication

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    
        app = moduleFixture.createNestApplication();

        prisma = moduleFixture.get(PrismaService)
    
        await app.init()
      })
      
      
      it('should create a new user', async () => {
        const response = await request(app.getHttpServer())
          .post('/create') 
          .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
          });
    
        expect(response.status).toBe(201); 
        expect(response.body).toEqual(expect.any(String))
      })
})
    
