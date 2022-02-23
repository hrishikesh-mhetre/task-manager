import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  // use typeorm to create the table Task using repository
  imports: [TypeOrmModule.forFeature([TaskRepository]), UserModule],

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
