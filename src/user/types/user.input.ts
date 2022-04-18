import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @Min(5)
  password: string;
}
