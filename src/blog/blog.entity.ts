/* eslint-disable prettier/prettier */
import { Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { type } from 'os';
import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BlogTags } from './blogTags.enum';
//import { BlogTags } from './blogTags.enum';

@Entity('Blog')
@Unique(['blogTitle'])
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  userId: number;
}
