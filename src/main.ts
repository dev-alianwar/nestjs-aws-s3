import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const config = new DocumentBuilder()
    .setTitle('S3 upload and read')
    .setDescription(
      'This repository gives example of streaming file upload to AWS S3 bucket and retrieving them from S3 bucket',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.servers = [
    {
      url: `http://localhost:${port}`,
      description: 'Url for local development',
    },
    {
      url: 'https://face-recognition-app.ngrok.io',
      description: 'Live apis',
    },
  ];

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}
bootstrap();
