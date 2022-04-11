import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BlogRepository } from './blog.repository';
import { BlogInputType } from './types/blog.input';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  async createBlog(user: UserEntity, input: BlogInputType, id?: number) {
    return this.blogRepository.createBlog(user, input, id);
  }

  async getBlogById(id: number) {
    return this.blogRepository.getBlogById(id);
  }
  async AllBlogs() {
    return this.blogRepository.AllBlogs();
  }

  async getBlogs(user: UserEntity) {
    return this.blogRepository.getBlogs(user);
  }

  async updateBlog(id: number, input: BlogInputType, user: UserEntity) {
    const blog = await this.getBlogById(id);

    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    await blog.save();

    return blog;
  }

  async deleteBlog(id: number) {
    return this.blogRepository.deleteBlog(id);
  }
}
