import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from './comment.repository';
import { BoardRepository } from '../boards/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board])],
  controllers: [CommentController],
  providers: [CommentService, BoardRepository, CommentRepository],
})
export class CommentModule {}
