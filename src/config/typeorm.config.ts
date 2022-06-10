import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BlogEntity } from 'src/blog/blog.entity';
import { UserEntity } from 'src/user/user.entity';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  database: 'blogdata',
  type: 'sqlite',
  entities: [BlogEntity, UserEntity],
  synchronize: true,
  //type: 'postgres',
  //host: 'localhost',
  //port: 5432,
  //username: 'postgres',
  //password: 'india',
  //database: 'blogdb',
  //entities: [BlogEntity, UserEntity],
  //synchronize: true,
};
