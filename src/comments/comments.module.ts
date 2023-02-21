import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from 'src/followers/services/follower.entity';
import { Post } from 'src/posts/post.entity';
import { Muchos } from 'src/users/muchos.entity';
import { User } from 'src/users/user.entity';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Follower, Muchos, Comment])],
  controllers: [CommentsController],
  providers: [{provide: 'ICommentsService', useClass: CommentsService}]
})
export class CommentsModule {}
