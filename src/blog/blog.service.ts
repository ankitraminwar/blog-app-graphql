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

  async createBlog(input: BlogInputType, user: UserEntity) {
    return this.blogRepository.createBlog(input, user);
  }

  async getBlogById(id: number) {
    const blog = await this.blogRepository.findOne(id);
    if (blog) {
      throw new NotFoundException('Blog Not Found');
    }
    return blog;
  }
  /* async getAllBlogs() {
    const blog = await this.blogRepository.findOne(id);
    if (blog) {
      throw new NotFoundException('Blog Not Found');
    }
    return blog;
  }*/

  async getBlogs(status: string) {
    return this.blogRepository.getBlogs(status);
  }

  async updateBlog(id: number, input: BlogInputType) {
    const blog = await this.getBlogById(id);

    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    await blog.save();

    return blog;
  }

  async deleteBlog(id: number) {
    const result = await this.blogRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException('Blog not Found');
    }

    return result;
  }
}
