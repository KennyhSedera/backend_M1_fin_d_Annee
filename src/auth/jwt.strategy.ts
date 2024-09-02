import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '189d723f9a321f2ff04228ef9f19a87ec883bb4e75a5f8df2b2dde162d6c3c18', 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
