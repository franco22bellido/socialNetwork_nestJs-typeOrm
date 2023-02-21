import { Comment } from "../comment.entity";
import { createCommentDto } from "../dto/create-comment.dto";

export interface ICommentsService {

    createComment(comment: createCommentDto): Promise<Comment>;
    getCommentsUser(userId: number): Promise<Comment[]>;
    getCommentsPost(postId: number): Promise<Comment[]>;

    updateComment(text: string, commentId:number) : Promise<any>;
    deleteComment(commentId : number, userId: number): Promise<any>
}