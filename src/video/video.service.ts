import { Injectable } from '@nestjs/common';
import { Video } from './video.interface';

@Injectable()
export class VideoService {
  private readonly videos: Video[] = [
    {
      id: 1,
      title: 'Video 1',
      description: 'Description 1',
      link: 'https://example.com/video1',
    },
    {
      id: 2,
      title: 'Video 2',
      description: 'Description 2',
      link: 'https://example.com/video2',
    },
    {
      id: 3,
      title: 'Video 3',
      description: 'Description 3',
      link: 'https://example.com/video3',
    },
  ];

  findAll() {
    return this.videos;
  }
}
