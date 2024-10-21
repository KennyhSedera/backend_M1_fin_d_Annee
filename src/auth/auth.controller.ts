import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { useremail: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.useremail,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Get('verify')
  verifyToken(@Query('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProtectedData(@Req() req: Request) {
    const result = await req.user;
    if (!result[0].success) {
      return result[0];
    }
    return { message: 'Protected data', user: result[0].result };
  }
}
