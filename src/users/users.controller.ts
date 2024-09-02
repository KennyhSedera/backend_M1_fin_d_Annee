import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';
import { log } from 'console';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.getOne(id);
    }

    @Get()
    findAll(): User[] {
        return this.service.getAll();
    }

    @Post()
    signup(@Body() newUser) {
        return this.service.create(newUser);
    }
}
