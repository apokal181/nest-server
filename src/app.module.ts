import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TodoModule} from "./todos/todo.module";
import {UserModule} from "./users/user.module";

@Module({
  imports: [TodoModule, UserModule, MongooseModule.forRoot('mongodb+srv://Hennadii:18059118Uu@cluster0.apvjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
