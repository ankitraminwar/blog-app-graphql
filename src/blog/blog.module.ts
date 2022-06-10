import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { BlogService } from '../blog/blog.service';
import { BlogRepository } from './blog.repository';
import { BlogResolver } from './blog.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository]), UserModule],
  controllers: [],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
