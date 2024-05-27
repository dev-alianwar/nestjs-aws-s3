import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3 as S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3: S3;
  private s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    const config = {
      credentials: {
        accessKeyId: this.configService.get('aws.s3.accessKeyId') || '',
        secretAccessKey: this.configService.get('aws.s3.secretAccessKey') || '',
      },
      region: this.configService.get('aws.s3.region'),
    };
    this.s3 = new S3(config);
    this.s3Client = new S3Client(config);
  }

  parseBase64(base64Data?: string) {
    if (!base64Data) return;
    return Buffer.from(
      base64Data.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
  }

  async getSignedUrl(key: string) {
    const params = {
      Bucket: this.configService.get('aws.s3.bucket'),
      Key: key,
      Expires: 60 * 60,
    };

    return this.s3.getSignedUrlPromise('getObject', params);
  }
  async uploadImage(
    key: string,
    imageFile: Express.Multer.File,
    base64File?: string,
  ) {
    const file = imageFile.buffer || this.parseBase64(base64File);
    await this.uploadFile(key, file);
    return this.getSignedUrl(key);
  }
  async uploadFile(key: string, file: any) {
    return await this.s3Upload(
      file,
      this.configService.get('aws.s3.bucket') || '',
      key,
      file.mimetype,
    );
  }

  async s3Upload(
    buffer: string,
    bucket: string,
    key: string,
    mimetype: string,
  ) {
    try {
      const params: S3.PutObjectRequest = {
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype || 'image/png', // Set content type as per your image type
        // ACL: 'public-read', // public read is off
      };

      await this.s3.upload(params).promise();
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      console.log(error);
    }
  }

  async getObjectFromS3(key: string) {
    const params = {
      Bucket: this.configService.get('aws.s3.bucket'),
      Key: key,
    };
    const data = await this.s3Client.getObject(params);
    if (!data.Body) {
      throw new Error('Failed to get file stream from S3');
    }

    return {
      stream: data.Body as Readable,
      contentType: data.ContentType,
      contentLength: data.ContentLength,
    };
  }
  async getObject(s3Params: any) {
    return this.s3.getObject(s3Params).promise();
  }
}
