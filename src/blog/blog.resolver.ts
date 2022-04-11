import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/user/get.user.decorator';
import { GQLAuthGuard } from 'src/user/gql.authguard';
import { UserEntity } from 'src/user/user.entity';
import { BlogService } from './blog.service';
import { BlogInputType } from './types/blog.input';
import { BlogType } from './types/blog.type';

@Resolver((of) => BlogType)
@UseGuards(GQLAuthGuard)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query((returns) => [BlogType])
  blogs(@GetUser() user: UserEntity) {
    return this.blogService.getBlogs(user);
  }

  @Query((returns) => [BlogType])
  Allblogs() {
    return this.blogService.AllBlogs();
  }

  @Mutation((returns) => BlogType)
  createBlog(
    @Args('input') input: BlogInputType,
    @GetUser() user: UserEntity,
    @Args('id') id?: number,
  ) {
    return this.blogService.createBlog(user, input, id);
  }

  @Mutation((returns) => BlogType)
  updateBlog(
    @Args('id') id: number,
    @Args('input') input: BlogInputType,
    user: UserEntity,
  ) {
    return this.blogService.updateBlog(id, input, user);
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
