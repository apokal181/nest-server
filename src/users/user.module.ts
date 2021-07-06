import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import {UserSchema} from "./user.model";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { JwtStrategy } from './strategies/jwt-auth.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret: 'Hello John',
            signOptions: { expiresIn: '3600s' }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy, JwtStrategy],
    exports: [UserService],
})
export class UserModule {}
