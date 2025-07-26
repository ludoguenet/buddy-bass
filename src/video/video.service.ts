import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideo } from 'src/dto/create-video/create-video';
import { User } from 'src/user/user.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  findAll(): Promise<Video[]> {
    return this.videosRepository.find();
  }

  async createForUser(
    createVideo: CreateVideo,
    user: User,
  ): Promise<Video | null> {
    const video = this.videosRepository.create(createVideo);
    video.user = user;
    const savedVideo = await this.videosRepository.save(video);

    return savedVideo;
  }

  findOne(id: number): Promise<Video | null> {
    return this.videosRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.videosRepository.delete(id);
  }
}
