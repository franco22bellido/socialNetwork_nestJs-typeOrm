import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateuserDto } from "../dto/update-user.dto";

export interface IUsersService{
     getMuchos ();
     createUser (user: CreateUserDto);
     getUsers();
     getUser(id: number);
     deleteUser(id : number);
     updateUser(id: number, user: UpdateuserDto);
}