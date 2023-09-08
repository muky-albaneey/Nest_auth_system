/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from "@nestjs/class-validator";


export class CreateUserDto{

    @IsString()
    name: string;


    @IsEmail()
    email: string;

    @IsString()
    password: string;

}