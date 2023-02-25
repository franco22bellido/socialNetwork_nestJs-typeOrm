import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { FollowersModule } from './followers/followers.module';
import { Follower } from './followers/follower.entity';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host : 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ironman312345aAA',
      database: 'nestdb',
      entities: [User, Follower, Post, Comment, Like],
      synchronize: true
    }),
    UsersModule,
    PostsModule,
    FollowersModule,
    CommentsModule,
    LikesModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
