import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.enum';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  // dependency injection
  // TaskController is dependent on TaskService
  constructor(private taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: UserEntity,
    @Body() createTaskDto: CreateTaskDTO,
  ) {
    // 1. create a new task
    // 2. return all tasks
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get()
  getTasks(@GetUser() user: UserEntity, @Query() searchTaskDto: SearchTaskDTO) {
    return this.taskService.getTasks(searchTaskDto, user);
  }

  @Patch('/:id/:status')
  updateTaskStatus(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
