import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Follower } from 'src/followers/follower.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Muchos } from 'src/users/muchos.entity';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Follower,Muchos, Comment, Like])
  ],
  controllers: [PostsController],
  providers: [{provide: 'IPostService', useClass: PostsService},UsersService]
})
export class PostsModule {}
