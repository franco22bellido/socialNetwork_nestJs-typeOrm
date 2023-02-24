import { Body, Controller, Get, Post, Delete, Inject, Param,Put, ParseIntPipe, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { IPostService } from './services/Ipost.service';

@Controller('post')
export class PostsController {

    constructor(@Inject('IPostService') private postService: IPostService){}

    @Get()
    welcome(@Res() res: Response){
        return res.json();
    }

    @Post()
    async createPost(@Body() post: CreatePostDto){
        return await this.postService.createPost(post);
    }
    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id:number){
        return this.postService.getPost(id);
    }
    //aca hay que cambiar la implementación con jwt
    @Get('all/:userId')
    getPostsUser(@Param('userId', ParseIntPipe) userId: number){
        return this.postService.getPostsUser(userId);
    }
    //aca hay que cambiar la implementación con jwt
    @Put('/:id')
    updatePost(@Param('id', ParseIntPipe) id: number,
               @Body() post:UpdatePostDto){
        return this.postService.updatePost(id, 2 , post);
    }
    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe) id: number){
        return this.postService.deletePost(id, 2);
    }


}