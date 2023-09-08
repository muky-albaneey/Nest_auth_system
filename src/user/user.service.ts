/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async create(dto: CreateUserDto){
       const findUser = await this.prisma.user.findUnique({
        where: {
            email : dto.email
        }
       });

       if(findUser) throw new ConflictException();

       const saltOrRounds = 10;
        const pass = dto.password;
        const hashPass = await bcrypt.hash(pass, saltOrRounds);

       const newUser = await this.prisma.user.create({
        data :{...dto, password : hashPass}
       });

       const {password, ...result} = newUser;

       password;


       return result;

    }
  
    async findByEmail(email:string){
        return await this.prisma.user.findUnique({
            where :{
                email : email
            },
        });
    }

    async findById(id: number){
        return await this.prisma.user.findUnique({
            where:{
                id : id
            },
        })
    }

}
