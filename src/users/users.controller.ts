import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateuserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { IUsersService } from './services/Iusers.service';
import { jwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { IAuthService } from 'src/auth/services/Iauth.service';



@Controller('users')
export class UsersController {

    constructor (@Inject('IUsersService') private userService: IUsersService,
    @Inject('IAuthService') private authService: IAuthService){}


    @Post('/register')
    async createUser(@Body() newUser: CreateUserDto){
        const user:User  = await this.userService.getUserByUsername(newUser.username);
        if(user) throw new HttpException('user already created', HttpStatus.CONFLICT);
        return this.userService.createUser(newUser);
    }
    @Post('/login')
    async loginUser(@Body() userLogin: CreateUserDto){
        const userFound:User = await this.userService.getUserByUsername(userLogin.username);
        if(!userFound) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        const checkPassword = await this.authService.comparePassword(userLogin.password, userFound.password);
        if(!checkPassword) throw new HttpException("password no valid", 403);

        
        const token  = await this.authService.login(userFound);
        return {userFound, token}
    }

    @UseGuards(jwtAuthGuard)
    @Get()
    async getUsers(@Req() req: any): Promise<User[]> {
        return this.userService.getUsers();
    }
    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<any> {
        return this.userService.getUser(id);
    }
    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number) {
        return this.userService.deleteUser(id);
    }
    @Put('/:id')
    async updateUser(@Param('id', ParseIntPipe) id:number,@Body() user: UpdateuserDto,) {
        return this.userService.updateUser(id, user);
    }


}