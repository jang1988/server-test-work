import { Body, Controller, Param, Delete, Get, Post, Query, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ObjectId } from 'mongoose';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    create(@Body() dto: CreatePostDto) {
        return this.postsService.create(dto);
    }

    @Get()
    getAll() {
        return this.postsService.getAll();
    }
    
    @Get('/search')
    search(@Query('query') query: string) {
        return this.postsService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.postsService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.postsService.delete(id);
    }

    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() updatePostDto: Partial<CreatePostDto>): Promise<any> {
        const updatedPost = await this.postsService.update(id, updatePostDto);
    
        return updatedPost;
    }
    
}
