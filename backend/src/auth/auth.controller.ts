import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class AdminLoginDto {
  email!: string;
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() body: AdminLoginDto) {
    const { email, password } = body;
    return this.authService.loginAdmin(email, password);
  }
}

