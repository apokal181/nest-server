import {
    Body,
    Controller,
    ValidationPipe,
    Post,
    UseGuards,
    Request, Get
} from '@nestjs/common';

import {UserService} from './user.service'
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import { Header } from '@nestjs/common';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/signup')
    async signUp(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        console.log(authCredentialsDto)
        return await this.userService.signUp(authCredentialsDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
        return this.userService.signIn(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        return req.user;
    }
}



