import { HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from  '@nestjs/typeorm'
import {Repository} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateuserDto } from '../dto/update-user.dto';
import { User } from '../user.entity';
import { HttpException } from '@nestjs/common';
import { Muchos } from '../muchos.entity';
import { IUsersService } from './Iusers.service';


@Injectable()
export class UsersService implements IUsersService{


    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Muchos) private muchosRepository: Repository<Muchos>
      ){}
    
    async getMuchos (){
     return console.log("gaodifas");
    }
    async createUser (user: CreateUserDto): Promise<any>{
      const userFound = await this.userRepository.findOne({
        where: {username: user.username}
      });
      if(userFound){
        return new HttpException('User already exist', HttpStatus.CONFLICT)
      }
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

   getUsers(){
    return this.userRepository.find();
   }
   async getUser(id: number){
    
      const userFound = await this.userRepository.findOne({
        where: { id }
      });
      if(!userFound){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
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