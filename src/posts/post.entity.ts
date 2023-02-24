import { Comment } from "src/comments/comment.entity"
import { Like } from "src/likes/entities/like.entity"
import { User } from "src/users/user.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    content: string

    //no seria mejor escrbir la anotación 'join column'?
    @Column()
    authorId: number
    @ManyToOne(()=> User, user => user.posts)
    author: User; 

    @OneToMany(()=> Comment, comment => comment.post)
    comments: Comment[]

    @OneToMany(()=> Like, like => like.post)
    likes: Like[]

}