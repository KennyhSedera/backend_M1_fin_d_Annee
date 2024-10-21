import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findUnique({
      where: { useremail: data.useremail },
    });
    if (user) {
      return {
        success: false,
        message: 'Adresse email est utilisé deja',
      };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const status = data.status ? data.status : 'desactiver';
    const role = data.role ? data.role : 'Admin';

    const userData = { ...data, password: hashedPassword, status, role };
    await this.prisma.user.create({ data: userData });

    return {
      success: true,
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

  async findOneByEmail(useremail: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { useremail } });
    return user;
  }

  async update(id: number, data: Prisma.UserCreateInput) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      success: true,
      message: 'Utilisateur modifié avec succès',
    };
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return {
      success: true,
      message: 'Utilisateur supprimé avec succès',
    };
  }

  async verifyPassword(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email introuvable');
    }
    const passwordTrue = await bcrypt.compare(password, user.password);
    if (!passwordTrue) {
      throw new UnauthorizedException('Mot de passe incorect');
    } else {
      return true;
    }
  }
}
