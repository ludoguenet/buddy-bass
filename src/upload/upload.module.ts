import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService], // Exporting UploadService to be used in other modules
})
export class UploadModule {}
