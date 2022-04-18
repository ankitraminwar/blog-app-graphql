import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';
import { UserInput } from './types/user.input';
import { UserSignInInput } from './types/user.signin.input';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(userInput: UserInput) {
    const user = new UserEntity();

    if (userInput.email) {
      const valide = this.validateEmail(userInput.email);
      if ((await valide) == true) {
        user.email = userInput.email;
      }
    }

    user.firstName = userInput.firstName;

    user.lastName = userInput.lastName;

    user.password = `${crypto.MD5(userInput.password)}`;

    await user.save();

    return user;
  }

  async validateEmail(search: string) {
    let searchall: boolean;
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    // eslint-disable-next-line prefer-const
    searchall = regexp.test(search);
    console.log(searchall);
    return searchall;
  }

  async signin(userInput: UserSignInInput) {
    const { email, password } = userInput;

    const user = await this.findOne({ email });

    if (!user) {
      return null;
    }

    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
