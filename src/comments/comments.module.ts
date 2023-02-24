import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from 'src/followers/follower.entity';
import { Post } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/services/posts.service';
import { Muchos } from 'src/users/muchos.entity';
import { User } from 'src/users/user.entity';
import { Like } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Follower, Muchos, Comment, Like])],
  controllers: [CommentsController],
  providers: [{provide: 'ICommentsService', useClass: CommentsService},
              {provide: 'IPostService', useClass: PostsService}]
})
export class CommentsModule {}
