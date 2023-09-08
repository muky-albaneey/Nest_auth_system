/* eslint-disable prettier/prettier */
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService : UserService, private readonly jwt : JwtService){}
    
    async login(dto:LoginDto){

        const user = await this.validateUser(dto);                
        const payload = {username : user.email, sub: {name : user.name},};

        // const keys = {jwtTokenKeys : await this.jwt.signAsync(payload, {
        //     expiresIn: '1h',
        //     secret: process.env.jwtKeys,})}


        return {
            user,
            tokens :{
                jwtTokenKeys : await this.jwt.signAsync(payload, {
                    expiresIn: '35s',
                    secret: process.env.jwtKeys,
                }),
                
                refreshTokens :{
                    jwtTokenKeys : await this.jwt.signAsync(payload, {
                        expiresIn: '7d',
                        secret: process.env.jwtRefreshKeys,
                    }),
            }
        }

    }
}

    async validateUser(dto:LoginDto){

        const user = await this.userService.findByEmail(dto.email);

        if(user && (await bcrypt.compare(dto.password, user.password))){
            const {password, ...result} = user;

            return result;
        }

        if(!user) throw new UnauthorizedException('username or password is incorrect');
     
    }

    async refreshToken(user:any){
        const payload = {username : user.email, sub: user.sub};

        return {
            jwtTokenKeys : await this.jwt.signAsync(payload, {
                expiresIn: '35s',
                secret: process.env.jwtKeys,
            }),
            
            refreshTokens :{
                jwtTokenKeys : await this.jwt.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshKeys,
                }),
        }
        }
    }
}
