import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: number;

  @Field()
  username: string;
}
