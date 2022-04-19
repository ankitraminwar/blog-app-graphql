import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BlogTags } from '../blogTags.enum';

@ObjectType('Blog')
export class BlogType {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  blogTitle: string;

  @Field({ nullable: true })
  blogContent: string;

  @Field({ nullable: true })
  blogTags: BlogTags;

  @Field()
  userId: string;
}
