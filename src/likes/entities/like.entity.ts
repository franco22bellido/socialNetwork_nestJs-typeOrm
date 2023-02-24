import { Post } from "src/posts/post.entity";
import { User } from "src/users/user.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()//this class represent a many to many relation.
export class Like{
    //primary key composite!
    @PrimaryColumn()
    postId: number;
    @ManyToOne(()=>Post, post => post.likes)
    post: Post

    @PrimaryColumn()
    userId: number;
    @ManyToOne(()=> User, user => user.likes)
    user: User;
}