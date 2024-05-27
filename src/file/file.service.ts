import { Injectable } from '@nestjs/common';
import { S3Service } from '../services/s3.service';

@Injectable()
export class FileService {
  constructor(private s3Service: S3Service) {}

  async upload(id: number) {
    return this.s3Service.uploadFile();
  }

  async retrieve(key: string) {
    return this.s3Service.getObjectFromS3(key);
  }
}
