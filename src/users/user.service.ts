import {ConflictException,Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose'

import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from './interfaces/user.interface'


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>,
                private jwtService: JwtService
                ) {}
     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password } = authCredentialsDto;
         console.log('hello',email, password)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = new this.userModel({ email, password: hashedPassword });
        console.log(email, password)

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
     }

    async signIn(user: User) {
        const payload = { email: user.email, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(pass, user.password);

        if (valid) {
            return user;
        }

        return null;
    }
}