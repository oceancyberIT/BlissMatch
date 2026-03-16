import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Get('me')
  me(@Req() req: any) {
    const user = req.user ?? {};
    return {
      role: 'admin',
      email: user.email ?? null,
    };
  }
}

