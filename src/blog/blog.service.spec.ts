import { Test } from '@nestjs/testing';
import { UserEntity } from '../user/user.entity';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { BlogTags } from './blogTags.enum';

describe('testing of blog resolver', () => {
  let blogResolver: BlogResolver;
  let user: UserEntity;

  const mockBlogRepository = {
    createOrUpdateBlog: jest.fn(() => {
      return {
        id: expect.any(String),
        blogTitle: expect.any(String),
        blogContent: expect.any(String),
        blogTags: expect.any(String),
      };
    }),

    getBlogById: jest.fn(() => {
      return {
        id: expect.any(String),
        blogTitle: expect.any(String),
        blogContent: expect.any(String),
        blogTags: expect.any(String),
      };
    }),

    blogs: jest.fn(() => {
      return {
        id: expect.any(String),
        blogTitle: expect.any(String),
        blogContent: expect.any(String),
        blogTags: expect.any(String),
      };
    }),

    allBlogs: jest.fn(() => {
      return {
        id: expect.any(String),
        blogTitle: expect.any(String),
        blogContent: expect.any(String),
        blogTags: expect.any(String),
      };
    }),
    deleteBlog: jest.fn(() => {
      return String;
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BlogResolver, BlogService],
    })
      .overrideProvider(BlogService)
      .useValue(mockBlogRepository)
      .compile();
    blogResolver = await module.get<BlogResolver>(BlogResolver);
  });

  it('test', () => {
    expect(blogResolver).toBeDefined();
  });

  it('testing create blog', () => {
    const input = {
      id: '',
      blogTitle: 'test1',
      blogContent: 'this is test1',
      blogTags: BlogTags.NEWS,
    };
    expect(blogResolver.createOrUpdateBlog(input, user)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing update blog', () => {
    const input = {
      id: 'e0a0adca-5eac-4058-86d1-0bebcf1e58ee',
      blogTitle: 'test1',
      blogContent: 'this is test2 update',
      blogTags: BlogTags.NEWS,
    };
    expect(blogResolver.createOrUpdateBlog(input, user)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing blog by id', () => {
    const id = 'e0a0adca-5eac-4058-86d1-0bebcf1e58ee';

    expect(blogResolver.getBlogById(id)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing user blog', () => {
    expect(blogResolver.blogs(user)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing filter blog', () => {
    const input = {
      blogTitle: '',
      blogTags: BlogTags.NEWS,
    };
    expect(blogResolver.allblogs(input)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing filter blog', () => {
    const input = {
      blogTitle: 'india',
      blogTags: null,
    };
    expect(blogResolver.allblogs(input)).toEqual({
      id: expect.any(String),
      blogTitle: expect.any(String),
      blogContent: expect.any(String),
      blogTags: expect.any(String),
    });
  });

  it('testing delete blog', () => {
    const id = 'e0a0adca-5eac-4058-86d1-0bebcf1e58ee';
    expect(blogResolver.deleteBlog(id)).toEqual(String);
  });
});
