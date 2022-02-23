// configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: 'root',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'TaskManager',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],

  synchronize: false,
};
