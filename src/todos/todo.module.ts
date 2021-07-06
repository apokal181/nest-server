import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {ProductSchema} from "./todo.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}
