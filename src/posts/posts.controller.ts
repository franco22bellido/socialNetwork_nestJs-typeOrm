import { Body, Controller, Get, Post, Delete, Inject,
        Param, Put, ParseIntPipe, Res, HttpException,
        HttpStatus, UseGuards, Req } from '@nestjs/common';
import { IUsersService } from 'src/users/services/Iusers.service';
import { User } from 'src/users/user.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { IPostService } from './services/Ipost.service';

@Controller('post')
export class PostsController {

    constructor(@Inject('IPostService') private postService: IPostService,
        @Inject('IUserService') private userService: IUsersService
    ) { }

    @Get()
    welcome(@Res() res: Response) {
        return res.json();
    }

    @UseGuards()
    @Post()
    async createPost(@Req() req: any ,@Body() post: CreatePostDto) {
        post.authorId = req.user.id;
        const user: User = await this.userService.getUser(post.authorId);
        if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        return this.postService.createPost(post);
    }
    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPost(id);
    }
    //aca hay que cambiar la implementación con jwt
    @Get('all/:userId')
    getPostsUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.postService.getPostsUser(userId);
    }
    //aca hay que cambiar la implementación con jwt
    @Put('/:id')
    updatePost(@Param('id', ParseIntPipe) id: number,
        @Body() post: UpdatePostDto) {
        return this.postService.updatePost(id, 2, post);
    }
    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id, 2);
    }


}