import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { username: string; password: string }) {
    const response = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return response;
  }
}
