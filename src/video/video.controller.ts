import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { Response } from 'express';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  findAll(@Res() res: Response) {
    const videos = this.videoService.findAll();

    return res.render('videos', { videos, title: 'Your videos' });
  }

    @Get('upload')
  getUpload(@Res() res: Response) {
    return res.render('videos/upload', { title: 'Upload a video' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  postUpload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (! this.uploadService.upload(file)) {
        return res.status(500).json({ message: 'File upload failed', data: false });
    }

    return res.status(201).json({ message: 'File uploaded successfully', data: true });
  }
}
