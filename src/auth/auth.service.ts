// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Email introuvable");
    }
    const passwordTrue = await bcrypt.compare(password, user.password);
    if (!passwordTrue) {
      throw new UnauthorizedException("Mot de passe incorect");
    } else {
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
}
