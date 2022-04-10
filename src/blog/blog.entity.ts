import { IsNotEmpty } from 'class-validator';
import { type } from 'os';
import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { BlogTags } from './blogTags.enum';

@Entity('Blog')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //@IsNotEmpty()
  blogTitle: string;

  @Column('text')
  //@IsNotEmpty()
  blogContent: string;

  @Column()
  blogTags: string;

  @ManyToOne((type) => UserEntity, (user) => user.blogs, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
