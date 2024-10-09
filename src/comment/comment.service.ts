import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { BoardRepository } from '../boards/board.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly boardRepository: BoardRepository,
  ) {}
  async getCommentsByBoardId(boardId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { board: { id: boardId } } });
  }

  async addComment(
    boardId: number,
    content: string,
    user: User,
  ): Promise<Comment> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException('cannot find a board');
    }

    return this.commentRepository.addComment(content, user, board);
  }
}
