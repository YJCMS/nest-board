import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

@Injectable()
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not in the status option.`);
    }

    return value;
  }

  private isStatusValid(value: any) {
    const index = this.StatusOption.indexOf(value);
    return index !== -1;
  }
}
