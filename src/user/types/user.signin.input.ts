import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserSignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
