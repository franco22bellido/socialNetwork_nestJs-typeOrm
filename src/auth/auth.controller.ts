import { Controller, Inject } from '@nestjs/common';
import { IUsersService } from 'src/users/services/Iusers.service';
import { IAuthService } from './services/Iauth.service';


@Controller('auth')
export class AuthController {
    constructor(@Inject('IAuthService') private authService: IAuthService,    
                @Inject('IUserService') private userservice: IUsersService){}





}