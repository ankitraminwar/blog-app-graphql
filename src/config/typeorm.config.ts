import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BlogEntity } from 'src/blog/blog.entity';
import { UserEntity } from 'src/user/user.entity';
//import { BlogEntity } from 'src/blog/blog.entity';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  //username: 'sqlite3',
  //password: 'india',
  database: 'blogdata1',
  //port: 5432,
  //host: 'localhost',
  type: 'sqlite',
  entities: [BlogEntity, UserEntity],
  synchronize: true,
};
