import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateuserDto } from "../dto/update-user.dto";
import { User } from "../user.entity";

export interface IUsersService{
     createUser (user: CreateUserDto): Promise<User>;
     getUsers();
     getUser(id: number);
     getUserByUsername(username: string): Promise<User>;
     deleteUser(id : number);
     updateUser(id: number, user: UpdateuserDto);
     login(user: CreateUserDto);
}