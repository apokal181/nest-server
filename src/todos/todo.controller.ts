import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete, UseGuards, Request, ConflictException,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import mongoose from "mongoose";
import {JwtAuthGuard} from "../users/guards/jwt-auth.guard";

@Controller('products')
export class TodoController {
    constructor(private readonly productsService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addProduct(
        @Request() req,
        @Body('title') prodTitle: string,
        @Body('done') prodDone: boolean,
        @Body('important') prodImportant: boolean
    ) {
        console.log('HELLO)', req.user._id)
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDone,
            prodImportant,
            req.user._id
        );
        return { id: generatedId };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllProducts(@Request() req) {
        const products = await this.productsService.getProducts(req.user._id);
        return products;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateProduct(
        @Request() req,
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('done') prodDone: boolean,
        @Body('important') prodImportant: boolean,
    ) {
        let product = await this.productsService.getSingleProduct(prodId)
        console.log(req.user._id==product.owner)
        if (req.user._id == String(product.owner)) {
            await this.productsService.updateProduct(prodId, prodTitle, prodDone, prodImportant) ;
            product = await this.productsService.getSingleProduct(prodId)
            return product
        } else {
            throw new ConflictException('Error');
        }


    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')

   async removeProduct(@Request() req,@Param('id') prodId: string) {
        let product = await this.productsService.getSingleProduct(prodId)
        if (req.user._id === String(product.owner)) {
            await this.productsService.deleteProduct(prodId);
            return 'Todo ' + product.id + ' deleted'
        } else {
            throw new ConflictException('Error');
        }

    }
}