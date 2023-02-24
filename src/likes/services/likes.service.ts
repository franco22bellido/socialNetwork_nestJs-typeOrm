import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { ILikesService } from './ILikes.service';

@Injectable()
export class LikesService implements ILikesService{
    
    constructor(@InjectRepository(Like) private likesRepository: Repository<Like>){}

    async CountLikesPost(postId: number): Promise<number> {
         const result:number =  await this.likesRepository.countBy({postId});
         return result;
    }
    async deleteLike(postId: number, userId: number) {
        return await this.likesRepository.delete({postId, userId});
    }
    async addLike(postId: number, userId: number) {
        const liked = this.likesRepository.create({postId,userId});
        return await this.likesRepository.save(liked);
    }
    async UserLikedPost(postId: number): Promise<Like[]>{
        const users = await this.likesRepository.find({relations: {user: true},where: {postId}});
        return users;
    };
    
}