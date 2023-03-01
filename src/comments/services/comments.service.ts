import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { createCommentDto } from '../dto/create-comment.dto';
import { ICommentsService } from './IComments.service';

@Injectable()
export class CommentsService implements ICommentsService{

    constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>,
                @InjectRepository(Post) private postRepository: Repository<Post>){}

    async createComment(comment: createCommentDto): Promise<Comment> {
        const newComment =  this.commentsRepository.create(comment);
        return await this.commentsRepository.save(newComment);
    }
    async getCommentsUser(userId: number): Promise<Comment[]> {
        const coments = await this.commentsRepository.find({
            // relations: {user: true},
            where: {userId}});
        return coments;
    }
    async getCommentsPost(postId: number): Promise<Comment[]> {
        const coments = await this.commentsRepository.find({
            // relations: {post: true},
            where: {postId}});
        return coments;
    }
    async updateComment(text: string, commentId:number): Promise<any> { 
        // return await this.commentsRepository.update({id: commentId, userId}, {text});
        return await this.commentsRepository.save({id: commentId, text});
    }
    async deleteComment(commentId: number, userId: number): Promise<any> {
        return await this.commentsRepository.delete({id: commentId, userId});
    }

    async getComment(commentId: number): Promise<Comment> {
        return this.commentsRepository.findOne({where: {id: commentId}});
    }   
}