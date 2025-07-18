import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Response } from 'express';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateVideo } from 'src/dto/create-video/create-video';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  findAll(@Res() res: Response) {
    // const videos = this.videoService.findAll();

    const videos = [
      {
        id: 1,
        title: 'Video 1',
        description: 'Description 1',
        link: 'http://example.com/video1',
      },
      {
        id: 2,
        title: 'Video 2',
        description: 'Description 2',
        link: 'http://example.com/video2',
      },
      {
        id: 3,
        title: 'Video 3',
        description: 'Description 3',
        link: 'http://example.com/video3',
      },
    ];

    return res.render('videos', { videos, title: 'Your videos' });
  }

  @Get('upload')
  getUpload(@Res() res: Response) {
    return res.render('videos/upload', { title: 'Upload a video' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  postUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideo: CreateVideo,
    @Res() res: Response,
  ) {
    const fileName = this.uploadService.upload(file);

    const videoData = {
      ...createVideo,
      link: fileName,
    };

    // Here save the videoData to the database

    return res
      .status(201)
      .json({ message: 'File uploaded successfully', data: true });
  }
}
