import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './types/user.type';
import { UserInput } from './types/user.input';
import { SigninResponse } from './types/signin.response';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from './gql.authguard';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';
import { UserSignInInput } from './types/user.signin.input';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => UserType)
  signup(@Args('input') input: UserInput) {
    return this.userService.signup(input);
  }

  @Mutation((returns) => SigninResponse)
  signin(@Args('input') input: UserSignInInput) {
    return this.userService.signin(input);
  }

  @Query((returns) => UserType)
  @UseGuards(GQLAuthGuard)
  profile(@GetUser() user: UserEntity) {
    return user;
  }
}
