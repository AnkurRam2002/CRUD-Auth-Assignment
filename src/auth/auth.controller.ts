import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //register route

  /**
   * POST http://localhost:3000/auth/register
   */

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const hashedpassword = await bcrypt.hash(password, 12);

    return this.authService.register({
      name,
      email,
      username,
      password: hashedpassword,
    });
  }

  //login route

  /**
   * POST http://localhost:3000/auth/login
   */

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.login(email);

    //check if the user exists
    if (!user) {
      return { message: 'User not found' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    //check if the password matches the hashed password
    if (!isValid) {
      return { message: 'Invalid credentials' };
    }

    return user;
  }
}
