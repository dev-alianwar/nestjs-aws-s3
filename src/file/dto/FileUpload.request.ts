import { ApiProperty } from '@nestjs/swagger';

export class FileUploadRequest {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: Express.Multer.File;
}
