import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './user.entity'
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/post.entity';
import { Follower } from 'src/followers/services/follower.entity';
import { Muchos } from './muchos.entity';
import { Comment } from 'src/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Follower, Muchos, Comment]),
  PostsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}