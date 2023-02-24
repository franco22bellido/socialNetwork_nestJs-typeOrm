import { Controller, Inject} from '@nestjs/common';
import { ILikesService } from './services/ILikes.service';

@Controller('like')
export class LikesController {

    constructor(@Inject('ILikesService') private likesService: ILikesService){}
    


}
