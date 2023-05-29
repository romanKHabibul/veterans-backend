import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './user.entity';
import { FeedBackEntity } from 'src/feedback/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FeedBackEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
