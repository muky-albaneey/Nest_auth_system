/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "@nestjs/class-validator";


export class LoginDto {

    @IsString()
    @IsEmail()
    email : string

    @IsString()
    password: string;
}