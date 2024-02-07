import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostsDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const PostsSchema = SchemaFactory.createForClass(Post);
