import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BlogRepository } from './blog.repository';
import { BlogFilter } from './types/blog.filter';
import { BlogInputType } from './types/blog.input';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  async createBlog(user: UserEntity, input: BlogInputType) {
    return this.blogRepository.createBlog(user, input);
  }

  async createOrUpdateBlog(input: BlogInputType, user: UserEntity) {
    return this.blogRepository.createOrUpdateBlog(input, user);
  }

  async getBlogById(id: number) {
    return this.blogRepository.getBlogById(id);
  }
  async allBlogs(input: BlogFilter) {
    return this.blogRepository.allBlogs(input);
  }

  async getBlogs(user: UserEntity) {
    return this.blogRepository.getBlogs(user);
  }

  async updateBlog(input: BlogInputType) {
    return this.blogRepository.updateBlog(input);
  }

  async deleteBlog(id: number) {
    return this.blogRepository.deleteBlog(id);
  }
}
