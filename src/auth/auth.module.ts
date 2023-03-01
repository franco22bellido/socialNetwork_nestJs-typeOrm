import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'secreto',
    signOptions: {expiresIn: '20h'}
  })
],

  providers: [
    {provide: "IAuthService", useClass: AuthService}
              , {provide: 'IUserService', useClass: UsersService}, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
