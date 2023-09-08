/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards,Request } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly user : UserService, private readonly authService: AuthService){}

    @Post('register')
    async createRegisterUser(@Body() body:CreateUserDto){
        return await this.user.create(body);    
    }

    @Post('login')
    async loginUser(@Body() body : LoginDto){
        return await this.authService.login(body);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user) 
    }

}
