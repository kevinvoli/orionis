import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: "*",
    credentials: true,
    methods:'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  app.setGlobalPrefix('api')

  const port =process.env.SERVER_PORT
  await app.listen(port, ()=>{
    console.log(`votre api tourne sur a le port : ${port}`);
    
  });
}
bootstrap();
