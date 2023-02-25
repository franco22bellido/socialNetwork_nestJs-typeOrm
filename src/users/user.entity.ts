import { Comment } from 'src/comments/comment.entity';
import { Follower } from 'src/followers/follower.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Post } from 'src/posts/post.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ type : 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;


    @OneToMany(()=> Post, post => post.author)
    posts: Post[]

    @OneToMany(()=>Follower, follower => follower.follower)
    followers: Follower[]
    @OneToMany(()=>Follower, follower => follower.idol)
    idols: Follower[]

    @OneToMany(()=> Comment, comment => comment.user)
    comments: Comment[]

    @OneToMany(()=>Like, like =>like.user)
    likes: Like[]
}