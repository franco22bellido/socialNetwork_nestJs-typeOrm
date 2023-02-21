import { Post } from "src/posts/post.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string

    @Column()
    userId: number
    @ManyToOne(()=> User, user => user.comments)
    user: User

    @Column()
    postId: number
    @ManyToOne(()=>Post, post=> post.comments)
    post: Post
    
}