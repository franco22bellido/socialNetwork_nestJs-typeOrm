import { HttpException } from "@nestjs/common/exceptions";
import { CreatePostDto } from "../dto/create-post-dto";
import { UpdatePostDto } from "../dto/update-post-dto";
import { Post } from "../post.entity";

export interface IPostService{

    
    createPost (post: CreatePostDto): Promise< any>;
    deletePost(postToDelete: Post): Promise<Post> ;
    updatePost(beforePost: Post, post:UpdatePostDto): Promise<Post>;
    getPost(postId: number): Promise<Post>;
    getPostsUser(userId: number);

}