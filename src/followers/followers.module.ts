import { Module } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Follower } from './follower.entity';
import { FollowersController } from './followers.controller';
import { FollowersService } from './services/followers.service';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([Follower, User, Post, Like])
  ],
  controllers: [FollowersController],
  providers: [
    {provide: "IFollowersService", useClass: FollowersService}
  ]
})
export class FollowersModule {}
