import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Render,
  Res,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUser } from 'src/dto/create-user/create-user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('users/index')
  async findAll() {
    const users = await this.userService.findAll();
    return { users, title: 'Users' };
  }

  @Get('register')
  @Render('users/register')
  showRegisterForm() {
    return { title: 'Register User' };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUser, @Res() res: Response) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.redirect('/users/success');
    } catch (error) {
      return res.render('users/register', {
        title: 'Register User',
        error: 'Registration failed. Please try again.',
        formData: createUserDto,
      });
    }
  }

  @Get('success')
  @Render('users/success')
  showSuccess() {
    return { title: 'Registration Successful' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return { success: true };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
