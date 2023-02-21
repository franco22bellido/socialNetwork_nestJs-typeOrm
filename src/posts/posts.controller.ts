import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { IPostService } from './Ipost.service';
import {PostsService} from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(@Inject('IPostService') private postService: IPostService){}

    @Post()
    createPost(@Body() post: CreatePostDto){
        return this.postService.createPost(post);
    }
    @Get()
    getPost(){
       
    }

}
