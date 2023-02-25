import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Follower } from 'src/followers/follower.entity';
import { Like } from 'src/likes/entities/like.entity';


import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Follower, Comment, Like])
  ],
  controllers: [PostsController],
  providers: [{provide: 'IPostService', useClass: PostsService},
              {provide: 'IUserService', useClass: UsersService}]
})
export class PostsModule {}
