import { Field, InputType } from '@nestjs/graphql';
import { BlogTags } from '../blogTags.enum';

@InputType()
export class BlogInputType {
  @Field({ nullable: true })
  id: string;

  @Field()
  blogTitle: string;

  @Field()
  blogContent: string;

  @Field()
  blogTags: BlogTags;
}
