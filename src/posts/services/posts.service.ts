import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post-dto';
import { IPostService } from './Ipost.service';
import { Post } from '../post.entity';
import { UpdatePostDto } from '../dto/update-post-dto';
import { User } from 'src/users/user.entity';


@Injectable()
export class PostsService implements IPostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) { }
    async createPost(post: CreatePostDto): Promise<any> {
        // const userFound: User = await this.userRepository.findOne({where: {id: post.authorId}});
        // if(!userFound){
        //     return new HttpException('user not found', HttpStatus.NOT_FOUND);
        // };
        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }
    async deletePost(postToDelete: Post): Promise<Post> {
        await this.postRepository.delete(postToDelete);
        return postToDelete;
    }
    async updatePost(postFound: Post, post: UpdatePostDto): Promise<Post> {
        // const postFound = await this.postRepository.findOne({where: {id: postId, authorId: userId}});
        const postUpdated = Object.assign(postFound, post);
        await this.postRepository.save(postUpdated);
        return postUpdated;

    }
    async getPost(postId: number): Promise<Post> {
        const postFound: Post = await this.postRepository.findOne({ where: { id: postId } });
        // if(!postFound) throw new HttpException('post not found', HttpStatus.NOT_FOUND);

        return postFound;
    }
    getPostsUser(userId: number) {
        return this.postRepository.find({ where: { authorId: userId } });
    }




}