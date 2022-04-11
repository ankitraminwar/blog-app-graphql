import { NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { BlogInputType } from './types/blog.input';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async createBlog(user: UserEntity, input: BlogInputType, id?: number) {
    if (id == null || id == 0) {
      const blog = new BlogEntity();
      blog.blogTitle = input.blogTitle;
      blog.blogContent = input.blogContent;
      blog.blogTags = input.blogTags;

      blog.user = user;

      await blog.save();

      delete blog.user;

      return blog;
    } else {
      const blog = await this.getBlogById(id);

      blog.blogTitle = input.blogTitle;
      blog.blogContent = input.blogContent;
      blog.blogTags = input.blogTags;

      await blog.save();

      return blog;
    }
  }

  async getBlogs(user: UserEntity) {
    const query = this.createQueryBuilder('blog');

    query.andWhere(`blog.userId = :userId`, { userId: user.id });

    return await query.getMany();
  }

  async getBlogById(id: number) {
    const query = this.createQueryBuilder('blog');

    query.andWhere(`id=:id`, { id: id });

    const blog = query.getOne();

    if (await blog) {
      return await blog;
    }

    throw new NotFoundException('Blog Not Found here:)');
  }

  async AllBlogs() {
    //const query = this.createQueryBuilder('blog');

    //query.andWhere(`blogTags=:tags`, { BlogTags: tags });

    //const tagFilter = query.getMany();

    const allBlog = await this.find();

    return await allBlog;

    //return await tagFilter;
  }

  async deleteBlog(id: number) {
    const result = await this.getBlogById(id);
    if (result) {
      return await this.delete(result);
    } else {
      throw new NotFoundException('Blog not Found');
    }
  }
}
