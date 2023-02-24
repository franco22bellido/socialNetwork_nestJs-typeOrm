import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './user.entity'
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/post.entity';
import { Follower } from 'src/followers/follower.entity';
import { Muchos } from './muchos.entity';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/likes/entities/like.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Post, Follower, Muchos, Comment, Like]),
  PostsModule],
  controllers: [UsersController],
  providers: [{provide: "IUsersService", useClass: UsersService}]
})
export class UsersModule {}