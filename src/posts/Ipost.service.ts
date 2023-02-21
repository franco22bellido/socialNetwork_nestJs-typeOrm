import { CreatePostDto } from "./dto/create-post-dto";
import { Post } from "./post.entity";

export interface IPostService{

    
    createPost (post: CreatePostDto): Promise<Post>;
    deletePost(postId: number, userId: number): Promise<Post> ;
    updatePost(postId: number, userId: number, post:Post): Promise<Post>;
    getPost(postId: number): Promise<Post>;
    getPostsUser(userId: number);

}