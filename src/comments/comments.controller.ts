import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { IPostService } from 'src/posts/services/Ipost.service';
import { createCommentDto } from './dto/create-comment.dto';
import { updateCommentDto } from './dto/update-comment.dto';
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

    //el id del usuario se manda por token
    @Delete('/:id')
    deleteComment(@Param('id', ParseIntPipe) commentId: number){
        this.commentsService.deleteComment(commentId, 2);
    }

    //el id del usuario se manda por token
    @Get('/user/:id')
    getMyComments(@Param('id', ParseIntPipe) userId: number){
        return this.commentsService.getCommentsUser(userId);
    }

    @Get('/post/:id')
    getCommentsPost(@Param('id', ParseIntPipe) postId: number){
        return this.commentsService.getCommentsPost(postId);
    }
    @Put('/:id')
    updateMyComment(@Param('id', ParseIntPipe) commentId: number, 
    @Body() newComment: updateCommentDto){
        return this.commentsService.updateComment(newComment.text, commentId);
    }
}