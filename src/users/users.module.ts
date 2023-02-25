import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './user.entity'
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/post.entity';
import { Follower } from 'src/followers/follower.entity';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Post, Follower, Comment, Like]),
  JwtModule.register({
    secret: "secreto",
    signOptions: {expiresIn: '10h'}
  })
  ,
  PostsModule],
  controllers: [UsersController],
  providers: [{provide: "IUsersService", useClass: UsersService}, JwtStrategy]
})
export class UsersModule {}