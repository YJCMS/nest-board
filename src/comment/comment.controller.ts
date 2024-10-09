import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetUser } from '../auth/get-user.decorater';

@Controller('boards')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 게시물 아이디로 댓글 조회
  @Get('/:id/comment')
  async getCommentByBoardId(@Param('id') boardId: number) {
    return this.commentService.getCommentsByBoardId(boardId);
  }

  // 댓글 추가하기
  @Post('/:id/comment')
  async addComment(
    @Param('id') boardId: number,
    @Body('content') content: string,
    @GetUser() user, // 인증된 사용자 정보
  ) {
    return this.commentService.addComment(boardId, content, user);
  }
}
