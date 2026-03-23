import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

const jwtExpiresEnv = process.env.JWT_EXPIRES_IN;
const jwtExpiresIn =
  jwtExpiresEnv && !Number.isNaN(Number(jwtExpiresEnv))
    ? Number(jwtExpiresEnv)
    : 60 * 60 * 24; // 1 day in seconds

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret',
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}

