import { Controller, Inject, Get, Post, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { IfollowersService } from './services/IfollowersService';

@Controller('followers')
export class FollowersController {

    constructor(@Inject('IFollowersService') private followerService: IfollowersService){}

    @Post()
    async followUser(@Param('idolId', ParseIntPipe) idolId:number){
        this.followerService.followUser(1, idolId);
    }

    @Get('/followers')
    async getFollowers(): Promise<any>{
        return this.followerService.getFollowers(3);
    }
    @Get('/idols')
    async getIdols(): Promise<any>{
        return this.followerService.getIdols(3);
    }
    @Delete('/follower')
    async deleteFollower(@Param('followerId', ParseIntPipe) followerId: number){
        return this.followerService.deleteFollower(1, followerId);
    }

    @Delete('/idol')
    async deleteIdol(@Param('idolId', ParseIntPipe) idolId: number){
        return this.followerService.deleteIdol(1, idolId);
    }
}
