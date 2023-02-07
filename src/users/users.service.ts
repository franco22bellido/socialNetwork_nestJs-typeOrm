import { Injectable } from '@nestjs/common';
import {InjectRepository} from  '@nestjs/typeorm'
import {Repository} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>) {    
    }
  
    async createUser (user: CreateUserDto): Promise<CreateUserDto>{
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

   getUsers(){
    return this.userRepository.find();
   }
   getUser(id: number){
      return this.userRepository.findOne({
        where: { id }
      });
   }
   deleteUser(id : number){
    return this.userRepository.delete({id});
   }

   updateUser(id: number, user: UpdateuserDto) {
        return this.userRepository.update({id}, user);
   }
}