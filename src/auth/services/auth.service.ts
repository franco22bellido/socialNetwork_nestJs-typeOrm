import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IAuthService } from './Iauth.service';
import {hash,compare} from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService implements IAuthService{

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService){
    }



    async register(user: CreateUserDto) {
      const {password} = user;
      const plainToHash = await hash(password, 10);
      user.password = plainToHash;

      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

    login(userFound: User) {
      const payload: {} = {id: userFound.id, username: userFound.username};
      const token = this.jwtService.sign(payload);
      return token
    }

    async comparePassword(passwordPlain: string, passwordEncrypted: string): Promise<boolean>{
      const trueOrFalse: boolean = await compare(passwordPlain, passwordEncrypted);
      return trueOrFalse;
    }
 

}