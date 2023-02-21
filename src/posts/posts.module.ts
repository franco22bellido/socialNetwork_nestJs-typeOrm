import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Follower } from 'src/followers/services/follower.entity';
import { Muchos } from 'src/users/muchos.entity';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Follower,Muchos, Comment]),
  ],
  controllers: [PostsController],
  providers: [{provide: 'IPostService', useClass: PostsService}, UsersService]
})
export class PostsModule {}
