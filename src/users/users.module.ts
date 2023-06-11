import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './user.entity';
import { FeedBackEntity } from 'src/feedback/feedback.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FeedBackEntity]),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
