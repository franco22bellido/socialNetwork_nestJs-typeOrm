import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from '../follower.entity';
import { IfollowersService } from './IfollowersService';

@Injectable()
export class FollowersService implements IfollowersService {

    constructor(
        @InjectRepository(Follower) private followerRepository: Repository<Follower>) {
    }
    async followUser(followerId: number, idolId: number): Promise<any> {
        return await this.followerRepository.create({ followerId, idolId });
    }

    async getIdols(userId: number): Promise<any> {

        let idols = await this.followerRepository.find(
            { relations: { idol: true }, where: { followerId: userId } }
        );

        return idols;
    }
    async getFollowers(userId: number): Promise<any> {
        let followers = await this.followerRepository.find(
            { relations: { follower: true }, where: { idolId: userId } });

        return followers;
    }
    async deleteFollower(userdId: number, followerId: number): Promise<any> {
        await this.followerRepository.delete({ idolId: userdId, followerId });
    }
    async deleteIdol(userdId: number, idolId: number): Promise<any> {
        await this.followerRepository.delete({ followerId: userdId, idolId });
    }
}















