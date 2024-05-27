import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('/api/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/retrieve')
  async getProfileImage(@Res() res: Response) {
    try {
      const { stream, contentType, contentLength } =
        await this.fileService.getProfileImage(key);

      res.set({
        'Content-Type': contentType,
        'Content-Length': contentLength,
      });

      stream.pipe(res);
    } catch (error) {
      throw new BadRequestException('Error streaming file from S3');
    }
  }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const { user } = await this.userContext.getUser();

    if (!user) {
      return;
    }
    return this.profileService.create({
      ...createProfileDto,
      userId: user.id,
    });
  }
}
