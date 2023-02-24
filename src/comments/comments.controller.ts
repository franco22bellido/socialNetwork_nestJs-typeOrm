import { Body, Controller, Delete, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { IPostService } from 'src/posts/services/Ipost.service';
import { createCommentDto } from './dto/create-comment.dto';
import { ICommentsService } from './services/IComments.service';

@Controller('comments')
export class CommentsController {

    constructor(@Inject('ICommentsService') private commentsService: ICommentsService,
                @Inject('IPostService') private postService :  IPostService){
                
    }

    @Post()
    createComment(@Body() comment:createCommentDto){
        const post = this.postService.getPost(comment.postId);
        if(!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
        return this.commentsService.createComment(comment);
    }

    @Delete('/:id')
    deleteComment(@Param('id', ParseIntPipe) id: number){
    }

}