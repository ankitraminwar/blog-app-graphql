import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';

describe('testing user resolver', () => {
  //let user: UserEntity;
  //let mockUserRepository: DeepMocked<UserRepository>;
  //let userService: UserService;
  let resolver: UserResolver;
  //const user : new UserEntity();

  const mockUserRepository = {
    signin: jest.fn(() => {
      return { token: expect.any(String) };
    }),

    signup: jest.fn(() => {
      return {
        id: expect.any(String),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
      };
    }),

    profile: jest.fn(() => {
      return {
        //id: expect.any(String),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
      };
    }),

    updateProfile: jest.fn(() => {
      return {
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
      };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [UserService, UserResolver],
    })
      .overrideProvider(UserService)
      .useValue(mockUserRepository)
      .compile();
    resolver = await module.get<UserResolver>(UserResolver);
  });

  it('test', () => {
    expect(resolver).toBeDefined();
  });

  it('testing sign in', () => {
    const input = {
      email: 'test1@gmail.com',
      password: 'test1',
    };
    expect(resolver.signin(input)).toEqual({
      token: expect.any(String),
    });
  });
  it('testing sign up', () => {
    const input = {
      email: 'test2@gmail.com',
      firstName: 'test2',
      lastName: 'test2',
      password: 'test2',
    };
    expect(resolver.signup(input)).toEqual({
      id: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });
  it('testing get profile', () => {
    let user: UserEntity;
    expect(resolver.profile(user)).toEqual({
      //id: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });

  it('testing update profile', () => {
    let user: UserEntity;
    const input = {
      email: 'xyz@gmail.com',
      firstName: 'xyz',
      lastName: 'xy',
    };
    expect(resolver.updateProfile(user, input)).toEqual({
      //id: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });
});
