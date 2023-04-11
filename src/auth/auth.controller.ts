import { Controller,Request } from '@nestjs/common';
import { Body, Get, Post, UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req)
    {
        return this.authService.sign(req.user)
    }
     @Get('profile')
     @UseGuards(JwtGuard)
    profile(@Request() req)
    {
        return req.user
    }
    @Post('register')
    register(@Body() createUserDto : CreateUserDto){
        return this.authService.registerUser(createUserDto)
    }
}
