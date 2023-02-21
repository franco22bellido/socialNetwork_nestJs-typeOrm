export interface IfollowersService {

    
    followUser(followerId:number, idolId: number): Promise<any>;

    getIdols(userId:number): Promise<any>;

    getFollowers(userdId: number): Promise<any>;

    deleteFollower(userdId: number, followerId: number): Promise<any>;
    deleteIdol(userdId: number, idolId: number): Promise<any>;
    
    
}
