import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { IPostService } from 'src/posts/services/Ipost.service';
import { jwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { createCommentDto } from './dto/create-comment.dto';
import { updateCommentDto } from './dto/update-comment.dto';
import { ICommentsService } from './services/IComments.service';

@UseGuards(jwtAuthGuard)
@Controller('comments')
export class CommentsController {

    constructor(@Inject('ICommentsService') private commentsService: ICommentsService,
                @Inject('IPostService') private postService :  IPostService){
                
    }

    @Post()
    async createComment(@Req() req:any, @Body() comment:createCommentDto){
        const post = await this.postService.getPost(comment.postId);
        if(!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
        comment.userId = req.user.id;// por las dudas
        return this.commentsService.createComment(comment);
    }


    @Delete('/:id')
    deleteComment(@Req() req:any, @Param('id', ParseIntPipe) commentId: number){
        return this.commentsService.deleteComment(commentId, req.user.id);
    }

    @Get('/mycomments')
    getMyComments(@Req() req:any){
        return this.commentsService.getCommentsUser(req.user.id);
    }

    @Get('/post/:id')
    async getCommentsPost(@Param('id', ParseIntPipe) postId: number){
        const postFound = await this.postService.getPost(postId);
        if(!postFound) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
        return this.commentsService.getCommentsPost(postId);
    }
    @Put('/:id')
    async updateMyComment(@Req() req:any,@Param('id', ParseIntPipe) commentId: number, 
    @Body() newComment: updateCommentDto){
        const commentFound =  await this.commentsService.getComment(commentId);
        if(!commentFound) throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
        if(commentFound.userId != req.user.id) throw new HttpException('this is not your comment!!', HttpStatus.NON_AUTHORITATIVE_INFORMATION);

        return this.commentsService.updateComment(newComment.text, commentId);
    }
}