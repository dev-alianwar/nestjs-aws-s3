import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
