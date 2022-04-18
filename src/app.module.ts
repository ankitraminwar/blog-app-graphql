import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BlogModule } from './blog/blog.module';
import { TypeORMConfiguration } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BlogModule,
    UserModule,
    TypeOrmModule.forRoot(TypeORMConfiguration),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
