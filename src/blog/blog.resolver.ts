import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../user/get.user.decorator';
import { GQLAuthGuard } from '../user/gql.authguard';
import { UserEntity } from '../user/user.entity';
import { BlogService } from './blog.service';
import { BlogFilter } from './types/blog.filter';
import { BlogInputType } from './types/blog.input';
import { BlogType } from './types/blog.type';

@Resolver((of) => BlogType)
@UseGuards(GQLAuthGuard)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [BlogType])
  blogs(@GetUser() user: UserEntity) {
    return this.blogService.blogs(user);
  }

  @Query(() => [BlogType])
  allblogs(@Args('input') input: BlogFilter) {
    return this.blogService.allBlogs(input);
  }

  @Mutation(() => BlogType)
  createBlog(@Args('input') input: BlogInputType, @GetUser() user: UserEntity) {
    return this.blogService.createBlog(user, input);
  }

  @Mutation(() => BlogType)
  updateBlog(@Args('input') input: BlogInputType) {
    return this.blogService.updateBlog(input);
  }

  @Mutation(() => BlogType)
  createOrUpdateBlog(
    @Args('input') input: BlogInputType,
    @GetUser() user: UserEntity,
  ) {
    return this.blogService.createOrUpdateBlog(input, user);
  }

  @Mutation(() => String)
  deleteBlog(@Args('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @Query(() => BlogType)
  getBlogById(@Args('id') id: string) {
    return this.blogService.getBlogById(id);
  }
}
