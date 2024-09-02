import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { useremail: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.useremail, loginDto.password);
    return this.authService.login(user);
  }
}
