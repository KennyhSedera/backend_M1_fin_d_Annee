import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { secretKey } from './secretKey';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email introuvable');
    } else if (user.status !== 'activer') {
      throw new UnauthorizedException('Votre compte est ' + user.status);
    }
    const passwordTrue = await bcrypt.compare(password, user.password);
    if (!passwordTrue) {
      throw new UnauthorizedException('Mot de passe incorect');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
      logged: true,
    };
  }

  async verifyToken(token: string) {
    try {
      return [
        {
          success: true,
          result: jwt.verify(token, secretKey),
        },
      ];
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return [
          {
            success: false,
            errorName: error.name,
            message: 'Votre session a expiré. Veuillez vous reconnecter.',
            error: 'Unauthorized',
            statusCode: 401,
          },
        ];
      } else {
        throw new UnauthorizedException('Token invalide');
      }
    }
  }
}
