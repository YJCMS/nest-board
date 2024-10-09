import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), BoardsModule, AuthModule],
})
export class AppModule {}
