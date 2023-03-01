import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";

export interface IAuthService{

    register(user: CreateUserDto);
    login(userFound: User);
    // encryptPassword(password: string): Promise<string>;
    comparePassword(passwordPlain: string, passwordEncrypted): Promise<boolean>;
    // generateToken(payload: {}): string;
}