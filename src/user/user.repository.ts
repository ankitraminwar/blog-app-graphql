import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';
import { UserInput } from './types/user.input';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(userInput: UserInput) {
    const user = new UserEntity();
    user.username = userInput.username;

    user.password = `${crypto.MD5(userInput.password)}`;

    await user.save();

    return user;
  }

  async signin(userInput: UserInput) {
    const { username, password } = userInput;

    const user = await this.findOne({ username });

    if (!user) {
      return null;
    }

    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
