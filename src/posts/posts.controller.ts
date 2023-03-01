import {
    Body, Controller, Get, Post, Delete, Inject,
    Param, Put, ParseIntPipe, Res, HttpException,
    HttpStatus, UseGuards, Req
} from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
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

    @UseGuards(jwtAuthGuard)
    @Post()
    async createPost(@Req() req: any, @Body() post: CreatePostDto) {
        post.authorId = req.user.id;
        const user: User = await this.userService.getUser(post.authorId);
        if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        return this.postService.createPost(post);
    }
    @Get('/getOne/:id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPost(id);
    }

    @UseGuards(jwtAuthGuard)
    @Get('/myposts')
    getPostsUser(@Req() req: any) {
        console.log(req.user.id);
        return this.postService.getPostsUser(req.user.id);
    }

    @UseGuards(jwtAuthGuard)
    @Put('/:id')
    async updatePost(@Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() post: UpdatePostDto) {
            const beforePost = await this.postService.getPost(id);
            if(!beforePost) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
            if(beforePost.authorId != req.user.id) throw new HttpException('post not found in your profile', HttpStatus.NOT_ACCEPTABLE);
            return this.postService.updatePost(beforePost, post);
    }
    
    @UseGuards(jwtAuthGuard)
    @Delete('/:id')
    async deletePost(@Req() req: any,
        @Param('id', ParseIntPipe) id: number) {
        const post = await this.postService.getPost(id);
        if(!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
        if(post.authorId != req.user.id) throw new HttpException('post not found in your profile', HttpStatus.NOT_ACCEPTABLE);
        return this.postService.deletePost(post);
    }


}