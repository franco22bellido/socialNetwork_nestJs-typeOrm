import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateuserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor (private userService: UsersService){}

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser);
    }
    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return this.userService.getUser(id);
    }
    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number) {
        return this.userService.deleteUser(id);
    }
    @Put('/:id')
    async updateUser(@Param('id', ParseIntPipe) id:number,@Body() user: UpdateuserDto,) {
        return this.userService.deleteUser(id, user);
    }


}