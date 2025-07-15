import { Injectable, ParseFilePipe, UploadedFile } from '@nestjs/common';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File): boolean {
    // move the file to public/videos
    const uploadPath = `public/videos/${file.originalname}`;
    const fs = require('fs');
    const path = require('path');

    // Ensure the directory exists
    const dir = path.dirname(uploadPath);
    fs.mkdirSync(dir, { recursive: true });

    // Move the file
    fs.writeFileSync(uploadPath, file.buffer);
    return true;
  }
}
