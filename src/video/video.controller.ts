import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { UserService } from 'src/user/user.service';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly userService: UserService,
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
        path: 'http://example.com/video1',
      },
      {
        id: 2,
        title: 'Video 2',
        description: 'Description 2',
        path: 'http://example.com/video2',
      },
      {
        id: 3,
        title: 'Video 3',
        description: 'Description 3',
        path: 'http://example.com/video3',
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
  async postUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideo: CreateVideo,
    @Res() res: Response,
  ) {
    const fileName = this.uploadService.upload(file);

    const videoData = {
      ...createVideo,
      path: fileName,
    };

    // Here save the videoData to the database
    // let's mock user
    const user = await this.userService.findOne(1);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.videoService.createForUser(videoData, user);

    return res
      .status(201)
      .json({ message: 'File uploaded successfully', data: true });
  }
}
