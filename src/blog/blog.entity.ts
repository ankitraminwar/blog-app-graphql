import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BlogTags } from './blogTags.enum';

@Entity('Blog')
@Unique(['blogTitle'])
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  blogTitle: string;

  @Column('text')
  @IsNotEmpty()
  blogContent: string;

  @Column()
  blogTags: BlogTags;

  @ManyToOne((type) => UserEntity, (user) => user.blogs, { eager: false })
  user: UserEntity;

  @Column()
  userId: string;
}
