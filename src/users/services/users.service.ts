import { HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from  '@nestjs/typeorm'
import {Repository} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateuserDto } from '../dto/update-user.dto';
import { User } from '../user.entity';
import { HttpException } from '@nestjs/common';
import { IUsersService } from './Iusers.service';

import {hash}  from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService{


    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      ){}


    getUserByUsername(username: string): Promise<User> {
      return this.userRepository.findOne({where: {username}, select: {username:true, id: true, password: true}});
    }
    
    async createUser (user: CreateUserDto): Promise<any>{
      const {password} = user;
      const plainToHash = await hash(password, 10);
      user.password = plainToHash;

      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

    //a prueba
    async login(user: CreateUserDto): Promise<any>{
      const userFound = await this.getUserByUsername(user.username);
    }

   getUsers(){
    return this.userRepository.find();
   }
   async getUser(id: number){
  
      const userFound = await this.userRepository.findOne({
        where: { id }
      });
      return userFound;
   }

   async deleteUser(id : number){
    const userFound = await this.userRepository.findOne({where: {id}});
    if(!userFound){
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    };
    return this.userRepository.delete({id});
   }

   async updateUser(id: number, user: UpdateuserDto) {
    const userFound = await this.userRepository.findOne({where: {id}});
    if(!userFound){
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    };
      const userUpdated = Object.assign(userFound, user);
      return this.userRepository.save(userUpdated);
   }

 


}