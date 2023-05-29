import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post("register")
  @HttpCode(200)
  register(@Body() request: registerDto){
    return this.authService.register(request)
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  @HttpCode(200)
  login(@Body() request: loginDto){
    return this.authService.login(request)
  }

}
