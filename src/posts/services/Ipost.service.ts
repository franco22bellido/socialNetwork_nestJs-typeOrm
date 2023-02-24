import { HttpException } from "@nestjs/common/exceptions";
import { CreatePostDto } from "../dto/create-post-dto";
import { UpdatePostDto } from "../dto/update-post-dto";
import { Post } from "../post.entity";

export interface IPostService{

    
    createPost (post: CreatePostDto): Promise< any>;
    deletePost(postId: number, userId: number): Promise<Post> ;
    updatePost(postId: number, userId: number, post:UpdatePostDto): Promise<Post>;
    getPost(postId: number): Promise<Post>;
    getPostsUser(userId: number);

}