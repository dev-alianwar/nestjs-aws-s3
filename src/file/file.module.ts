import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3Service } from '../services/s3.service';
import { FileController } from './file.controller';

@Module({
  providers: [FileService, S3Service],
  controllers: [FileController],
})
export class FileModule {}
