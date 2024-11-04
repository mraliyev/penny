import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('signin')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('check-email')
  async checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.authService.checkEmailExists(checkEmailDto);
  }
}
