import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { GQLAuthGuard } from './gql.authguard';
import { JwtStrategy } from './jwt.strategy';
import { UserInput } from './types/user.input';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: 3600 } }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [],
  providers: [UserService, JwtStrategy, UserResolver, UserInput, GQLAuthGuard],
  exports: [JwtStrategy, PassportModule, GQLAuthGuard],
})
export class UserModule {}
