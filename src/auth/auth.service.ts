import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    
    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUser(email: string, password: string){
        const user = await this.userService.findOneByEmail(email);
        if(!user || user.password !== password) return false;
        return user;
    }

    sign(user: User){
        const accessToken = this.jwtService.sign({
            sub:user.id,
            email:user.email
            })
        return {
            access_token: accessToken,
        }
    }
    async registerUser(createUserDto: CreateUserDto){
        const newUser = await this.userService.create(createUserDto)
        return this.sign(newUser);
    }
}
