import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { IPostService } from './Ipost.service';
import { Post } from './post.entity';

@Injectable()
export class PostsService implements IPostService{

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private userService: UsersService
    ){}
    async createPost(post: CreatePostDto): Promise<Post> {
        const userFound = await this.userService.getUser(post.authorId);
        if(!userFound){
            //validar si existe un usuario al que le estamos guardando
            //ese post
            // return new HttpException("user not found", HttpStatus.NOT_FOUND);
        }
        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }
    async deletePost(postId: number, userId: number): Promise<Post> {
        let post:Post = await this.postRepository.findOne({where: {id: postId, authorId: userId}});
        // if(!post) retornar error
        await this.postRepository.delete(post);
        return post;
    }
    async updatePost(postId: number, userId: number, post:Post): Promise<Post> {
        const postFound = await this.postRepository.find({where: {id: post.id, authorId: userId}});
        const postUpdated = Object.assign(postFound, post);
        await this.postRepository.save(postUpdated);
        return postUpdated;

    }
    getPost(postId: number): Promise<Post> {
        return this.postRepository.findOne({where: {id: postId}});
    }
    getPostsUser(userId: number) {
        return this.postRepository.find({where: {authorId: userId}});
    }
    


    
}