import {
  Controller,
  Get,
  Post,
  Res,
  BadRequestException,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File')
@Controller('/api/file')
export class FileController {
  authService: any;
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  signUp(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000000 }),
          new FileTypeValidator({ fileType: '(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.upload(file);
  }

  @Get('/retrieve/:key')
  async getProfileImage(@Param('key') key: string, @Res() res: Response) {
    try {
      const { stream, contentType, contentLength } =
        await this.fileService.retrieve(key);

      res.set({
        'Content-Type': contentType,
        'Content-Length': contentLength,
      });

      stream.pipe(res);
    } catch (error) {
      throw new BadRequestException('Error streaming file from S3');
    }
  }
}
