import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './contants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret:jwt.secretKey,
      signOptions:{expiresIn:'10h'}
    }),
    UserModule],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
