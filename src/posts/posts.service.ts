import { Injectable } from '@nestjs/common';
import { Post, PostsDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postsModel: Model<PostsDocument>) {}

    async create(dto: CreatePostDto): Promise<Post> {
        const post = await this.postsModel.create({ ...dto, listen: 0 });
        return post;
    }

    async getAll(): Promise<Post[]> {
        const posts = await this.postsModel.find();
        return posts;
    }

    async getOne(id: ObjectId): Promise<Post> {
        const post = await this.postsModel.findById(id);
        return post;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const post = await this.postsModel.findByIdAndDelete(id);
        return post.id;
    }

    async search(query: string): Promise<Post[]> {
        const posts = await this.postsModel.find({
            title: {$regex: new RegExp(query, 'i')}
        })


        return posts;
    }

    async update(id: string, dto: Partial<CreatePostDto>): Promise<Post> {
        const updatedPost = await this.postsModel.findByIdAndUpdate(id, dto, { new: true });
        return updatedPost;
    }
}
