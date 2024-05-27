import { Injectable } from '@nestjs/common';
import { S3Service } from '../services/s3.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private s3Service: S3Service) {}

  async upload(file: Express.Multer.File) {
    const key = uuidV4();
    return this.s3Service.uploadFile(key, file);
  }

  async retrieve(key: string) {
    return this.s3Service.getObjectFromS3(key);
  }
}
