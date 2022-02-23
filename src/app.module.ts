import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TaskModule,
    UserModule,

    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeORMConfiguration),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
