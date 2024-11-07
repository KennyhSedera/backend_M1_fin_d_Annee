import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Patch('photo/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/user',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + file.originalname.replace(/\.[^/.]+$/, '');
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    let userPhoto = '';
    if (file) {
      userPhoto = 'user/' + file.filename;
      console.log(userPhoto);
    } else {
      userPhoto = '';
      console.log(userPhoto);
    }
    return this.userService.updatePhoto(userPhoto, +id);
  }
}
