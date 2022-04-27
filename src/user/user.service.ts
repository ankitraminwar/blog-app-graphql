import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt.payload';
import { UserProfileInput } from './types/profile.input';
import { UserInput } from './types/user.input';
import { UserSignInInput } from './types/user.signin.input';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signup(userInput: UserInput) {
    return this.userRepository.signup(userInput);
  }

  async updateProfile(user: UserEntity, input: UserProfileInput) {
    return this.userRepository.updateProfile(user, input);
  }

  async signin(userInput: UserSignInInput) {
    const user = await this.userRepository.signin(userInput);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
    };

    const token = await this.jwtService.sign(payload);

    return { token, user };
  }
}
