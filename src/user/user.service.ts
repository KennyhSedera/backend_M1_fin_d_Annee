import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'; 
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = { ...data, password: hashedPassword };
    await this.prisma.user.create({ data: userData });

    return {
      message: 'Utilisateur créé avec succès',
    };
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(useremail:string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: {useremail} });
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    await this.prisma.user.update({
      where: { id },
      data,
    });
    return {
      message: 'Utilisateur modifié avec succès',
    };
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return {
      message: 'Utilisateur supprimé avec succès',
    };
  }
}
