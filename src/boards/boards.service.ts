import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
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
  // // getAllBoards(): Board[] {
  // //   return this.boards;
  // }
  //

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }
  // createBoard(creatBoardDto: CreateBoardDto): Board {
  //   const { title, description } = creatBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('cannot find Board with id {id}');
    }

    return found;
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((boards) => boards.id === id);
  //   if (!found) {
  //     throw new NotFoundException('cannot find Board with id {id}');
  //   }
  //
  //   return found;
  // }
  //

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user }); // 데이터 있으면 삭제하고, 없으면 영향없음
    if (result.affected === 0) {
      throw new NotFoundException('cannot find Board with id {id}');
    }
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
