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
import { UserProfileInput } from './types/profile.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  signup(@Args('input') input: UserInput) {
    return this.userService.signup(input);
  }

  @Query(() => SigninResponse)
  signin(@Args('input') input: UserSignInInput) {
    return this.userService.signin(input);
  }

  @Query(() => UserType)
  @UseGuards(GQLAuthGuard)
  profile(@GetUser() user: UserEntity) {
    return this.userService.profile(user);
  }

  @Mutation(() => UserType)
  @UseGuards(GQLAuthGuard)
  updateProfile(
    @GetUser() user: UserEntity,
    @Args('input') input: UserProfileInput,
  ) {
    return this.userService.updateProfile(user, input);
  }
}
