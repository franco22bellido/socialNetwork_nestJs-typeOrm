import { Controller, Inject } from '@nestjs/common';
import { ICommentsService } from './services/IComments.service';

@Controller('comments')
export class CommentsController {

    constructor(@Inject('ICommentsService') private commentsService: ICommentsService){}
    

}