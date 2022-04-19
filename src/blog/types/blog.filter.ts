import { Field, InputType } from '@nestjs/graphql';
import { BlogTags } from '../blogTags.enum';

@InputType()
export class BlogFilter {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  blogTitle: string;

  @Field({ nullable: true })
  blogTags: BlogTags;
}
