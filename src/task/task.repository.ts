import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.enum';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(searchTaskDto: SearchTaskDTO, user: UserEntity) {
    // get the search parameter and status value
    const { search, status } = searchTaskDto;

    // select * from task where title like '%{search}%' or description like '%{search}%'

    // create a query builder
    const query = this.createQueryBuilder('task');

    // search by status
    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    // search by title and description
    if (search) {
      query.andWhere(
        `(task.title LIKE :search) OR (task.description LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    // add the user id
    query.andWhere(`task.userId = :userId`, { userId: user.id });

    // execute the query to get many records
    return await query.getMany();
  }

  // updateTask() {}

  async createTask(createTaskDto: CreateTaskDTO, user: UserEntity) {
    // create a row in the Task Table (TaskEntity)
    const task = new TaskEntity();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;


    task.user = user;
    await task.save();
    // delete user property
    delete task.user;

    return task;
  }
}
