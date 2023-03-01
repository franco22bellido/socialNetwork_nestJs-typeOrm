import { Controller, Inject, Get, Post, Param, ParseIntPipe, Delete, UseGuards, Req} from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

import { IfollowersService } from './services/IfollowersService';

@UseGuards(jwtAuthGuard)
@Controller('followers')
export class FollowersController {

    constructor(@Inject('IFollowersService') private followerService: IfollowersService){}

    @Post()
    async followUser(@Req() req:any,@Param('idolId', ParseIntPipe) idolId:number){
        this.followerService.followUser(req.user.id, idolId);
    }

    @Get('/followers')
    async getFollowers(@Req() req:any): Promise<any>{
        return this.followerService.getFollowers(req.user.id);
    }
    @Get('/idols')
    async getIdols(@Req() req:any): Promise<any>{
        return this.followerService.getIdols(req.user.id);
    }
    @Delete('/:followerId')
    async deleteFollower(@Req() req:any, @Param('followerId', ParseIntPipe) followerId: number){
        return this.followerService.deleteFollower(req.user.id, followerId);
    }

    @Delete('/idol/:idolId')
    async deleteIdol(@Req() req:any, @Param('idolId', ParseIntPipe) idolId: number){
        return this.followerService.deleteIdol(req.user.id, idolId);
    }
}
