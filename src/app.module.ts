import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { FollowersModule } from './followers/followers.module';
import { Follower } from './followers/services/follower.entity';
import { Post } from './posts/post.entity';
import { Muchos } from './users/muchos.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host : 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ironman312345aAA',
      database: 'nestdb',
      entities: [User, Follower, Post,Muchos, Comment],
      synchronize: true
    }),
    UsersModule,
    PostsModule,
    FollowersModule,
    CommentsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
