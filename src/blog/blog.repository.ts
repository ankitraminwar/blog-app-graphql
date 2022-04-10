//import { createBlogDTO } from 'src/dto/create.blog.dto';
//import { SearchBlogDTO } from 'src/dto/search.blog.dto';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { BlogInputType } from './types/blog.input';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async createBlog(input: BlogInputType, user: UserEntity) {
    const blog = new BlogEntity();
    blog.blogTitle = input.blogTitle;
    blog.blogContent = input.blogContent;
    blog.blogTags = input.blogTags;

    blog.user = user;

    await blog.save();

    delete blog.user;

    return blog;
  }

  async getBlogs(status: string) {
    //const { search } = status;

    const query = this.createQueryBuilder('blog');

    if (status) {
      query.andWhere(
        `(blog.blogTitle LIKE :status) OR (blog.blogContent LIKE :status)`,
        { blogTitle: `%${status}%` },
      );
    }

    return await query.getMany();
  }
}
