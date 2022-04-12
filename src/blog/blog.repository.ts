import { NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
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

    await blog.save();

    delete blog.user;

    return blog;
  }

  async updateBlog(input: BlogInputType) {
    const blog = await this.getBlogById(input.id);

    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    await blog.save();

    return blog;
  }

  async createOrUpdateBlog(input: BlogInputType, user: UserEntity) {
    if (input.id == null || input.id == 0 || input.id == undefined) {
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

  async getBlogById(id: number) {
    const query = this.createQueryBuilder('blog');

    query.andWhere(`id=:id`, { id: id });

    const blog = query.getOne();

    if (await blog) {
      return await blog;
    }

    throw new NotFoundException('Blog Not Found here:)');
  }

  async AllBlogs(input: BlogFilter) {
    let allBlog = await this.find();
    if (input.blogTags == null || input.blogTitle) {
      return allBlog;
    }
    if (input.blogTags) {
      allBlog = allBlog.filter(
        (allBlog) => allBlog.blogTags === input.blogTags,
      );
    }
    if (input.blogTitle) {
      allBlog = allBlog.filter(
        (allBlog) => allBlog.blogTitle === input.blogTitle,
      );
    }
    if (input.blogTags && input.blogTitle) {
      allBlog = allBlog.filter(
        (allBlog) =>
          allBlog.blogTags.includes(input.blogTags) &&
          allBlog.blogTitle.includes(input.blogTitle),
      );
    }
    return allBlog;
  }

  async deleteBlog(id: number) {
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
