import { Field, ID, ObjectType } from '@nestjs/graphql';
//import { BlogTags } from '../blogTags.enum';

@ObjectType('Blog')
export class BlogType {
  @Field((type) => ID)
  id: number;

  @Field()
  blogTitle: string;

  @Field()
  blogContent: string;

  @Field()
  blogTags: string;
}
