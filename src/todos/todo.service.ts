import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from "mongoose";

import { Product } from './todo.model';
import mongoose from "mongoose";


@Injectable()
export class TodoService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
    }

    async insertProduct(title: string, done: boolean, important: boolean, owner: string) {
        const newProduct = new this.productModel({
            title,
            done,
            important,
            owner
        });
       const result = await newProduct.save();
       return result.id as string;
    }

    async getProducts(id) {
        const products = await this.productModel.find({owner: id}).exec();
        return products.map((prod) => ({id: prod.id, title: prod.title, done: prod.done, important: prod.important, owner: prod.owner}));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return product ;
    }

    async updateProduct(
        productId: string,
        title: string,
        done: boolean,
        important: boolean,

    ) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (done) {
            updatedProduct.done = done;
        }
        if (important) {
            updatedProduct.important = important;
        }
        await updatedProduct.save();
    }

    async deleteProduct(prodId: string) {
        let product
        try {
            product = await this.productModel.findById(prodId)
        } catch (e) {
            throw new NotFoundException('Could not find product.');
        }

        if (!product) {
            throw new NotFoundException('Could not find product.');
        } else {
            await this.productModel.deleteOne({_id: prodId}).exec();
        }

    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id, );
        } catch (e) {
            throw new NotFoundException('Could not find product.');
        }
       
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

}