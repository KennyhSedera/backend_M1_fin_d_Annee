import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserCreateInput,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserCreateInput,
  ) {
    await this.userService.update(+id, updateUserDto);
    return {
      success: true,
      message: 'Mot de passe modifié avec succès',
    };
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserCreateInput,
  ) {
    await this.userService.update(+id, updateUserDto);
    return {
      success: true,
      message: 'Status modifié avec succès',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
