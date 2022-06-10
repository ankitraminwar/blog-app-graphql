import { NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { BlogFilter } from './types/blog.filter';
import { BlogInputType } from './types/blog.input';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async createBlog(user: UserEntity, input: BlogInputType) {
    const blog = new BlogEntity();
    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    blog.user = user;

    const result = await blog.save();

    delete blog.user;

    return result;
  }

  async updateBlog(input: BlogInputType) {
    const blog = await this.getBlogById(input.id);

    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    const result = await blog.save();

    return result;
  }

  async createOrUpdateBlog(input: BlogInputType, user: UserEntity) {
    if (
      input.id === null ||
      input.id === undefined ||
      input.id === 'undefined' ||
      input.id === ''
    ) {
      return this.createBlog(user, input);
    } else {
      return this.updateBlog(input);
    }
  }

  async getBlogs(user: UserEntity) {
    const query = this.createQueryBuilder('blog');

    query.andWhere(`blog.userId = :userId`, { userId: user.id });

    return await query.getMany();
  }

  async getBlogById(id: string) {
    const query = this.createQueryBuilder('blog');

    query.andWhere(`id=:id`, { id: id });

    const blog = query.getOne();

    if (await blog) {
      return await blog;
    }

    throw new NotFoundException('Blog Not Found here:)');
  }

  async allBlogs(input: BlogFilter) {
    const allBlog = await this.find();
    const query = this.createQueryBuilder('blog');
    if (input.blogTags == null && input.blogTitle == null) {
      return allBlog;
    }
    if (input.blogTitle === '' && input.blogTags === null) {
      return allBlog;
    }
    if (input.blogTags) {
      query.andWhere(`blog.blogTags LIKE :blogTags`, {
        blogTags: input.blogTags + '%',
      });
      const blog = query.getMany();
      return await blog;
    }
    if (input.blogTitle) {
      query.andWhere(`blog.blogTitle LIKE :blogTitle`, {
        blogTitle: input.blogTitle + '%',
      });
      const blog = query.getMany();

      return await blog;
    }
    return allBlog;
  }

  async deleteBlog(id: string) {
    const result = await this.getBlogById(id);
    if (result) {
      const stat = await this.delete(result);
      if (stat.affected == 1) {
        return 'Successfully deleted the blog';
      }
    } else {
      throw new NotFoundException('Blog not Found');
    }
  }
}
