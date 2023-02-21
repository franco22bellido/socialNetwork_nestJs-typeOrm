import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('follower')
export class Follower {
    
    @PrimaryColumn()
    followerId: number
    @ManyToOne(()=> User , user=> user.followers)
    follower: User;

    @PrimaryColumn()
    idolId: number;
    @ManyToOne(()=>User, user=> user.idols)
    idol: User;

} 