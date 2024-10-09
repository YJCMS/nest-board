import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Board } from '../boards/board.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async addComment(
    content: string,
    user: User,
    board: Board,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = content;
    comment.user = user;
    comment.board = board;

    await this.save(comment);
    return comment;
  }
}
