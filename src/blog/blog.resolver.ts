import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/user/get.user.decorator';
import { GQLAuthGuard } from 'src/user/gql.authguard';
import { UserEntity } from 'src/user/user.entity';
import { BlogService } from './blog.service';
//import { BlogTags } from './blogTags.enum';
import { BlogInputType } from './types/blog.input';
import { BlogType } from './types/blog.type';

@Resolver((of) => BlogType)
@UseGuards(GQLAuthGuard)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query((returns) => [BlogType])
  blogs(@Args('blogTitle') status: string) {
    return this.blogService.getBlogs(status);
  }

  @Mutation((returns) => BlogType)
  createBlog(@Args('input') input: BlogInputType, @GetUser() user: UserEntity) {
    return this.blogService.createBlog(input, user);
  }

  @Mutation((returns) => BlogType)
  updateBlog(@Args('id') id: number, @Args('input') input: BlogInputType) {
    return this.blogService.updateBlog(id, input);
  }

  @Mutation((returns) => BlogType)
  deleteBlog(@Args('id') id: number) {
    return this.blogService.deleteBlog(id);
  }

  @Query((returns) => BlogType)
  getBlogById(@Args('id') id: number) {
    return this.blogService.getBlogById(id);
  }
}
