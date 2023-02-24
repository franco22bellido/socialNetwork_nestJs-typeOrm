import {Like} from '../entities/like.entity'
export interface ILikesService{

    CountLikesPost(postId: number): Promise<number>;
    deleteLike(postId: number, userId: number);
    addLike(postId: number, userId: number);
    UserLikedPost(postId: number): Promise<Like[]>;

}