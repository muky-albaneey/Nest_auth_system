/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('user')
export class UserController {

    constructor(private readonly userservice : UserService){}

    @UseGuards(JwtGuard)
    @Get(":id")
    async getUserProfile(@Param('id') id: number){
        return await this.userservice.findById(id);
    }

   

}
