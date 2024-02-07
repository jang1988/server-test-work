import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostsSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: PostsSchema}])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
