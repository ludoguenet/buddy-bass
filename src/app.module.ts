import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { VideoModule } from './video/video.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Video } from './video/video.entity';

@Module({
  imports: [
    UploadModule,
    UserModule,
    VideoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bass_buddy',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
