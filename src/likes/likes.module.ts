import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './services/likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [
    {provide: "ILikesService", useClass: LikesService}
  ]
})

export class LikesModule {}
