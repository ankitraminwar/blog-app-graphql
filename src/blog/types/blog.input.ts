import { Field, InputType } from '@nestjs/graphql';
//import { BlogTags } from '../blogTags.enum';

@InputType()
export class BlogInputType {
  @Field()
  blogTitle: string;

  @Field()
  blogContent: string;

  @Field()
  blogTags: string;
}
