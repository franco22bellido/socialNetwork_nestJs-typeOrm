import { updateCommentDto } from "./update-comment.dto";

export class createCommentDto extends updateCommentDto{
    userId: number;
    postId: number;
}