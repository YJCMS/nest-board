import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoardDto.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('cannot find Board with id {id}');
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user }); // 데이터 있으면 삭제하고, 없으면 영향없음
    if (result.affected === 0) {
      throw new NotFoundException('cannot find Board with id {id}');
    }
  }

  async updateBoard(id: number, createBoardDto): Promise<Board> {
    const board = await this.getBoardById(id);
    board.title = createBoardDto.title;
    board.content = createBoardDto.content;
    await this.boardRepository.save(board);

    return board;
  }
}
