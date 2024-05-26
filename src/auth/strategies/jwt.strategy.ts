import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      uuid: payload.sub,
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      canChangeQa: payload.canChangeQa,
      sendNonConformitiesToEmail: payload.sendNonConformitiesToEmail,
      departament_uuid: payload.departament_uuid,
      creator_uuid: payload.creator_uuid,
      role_uuid: payload.role_uuid,
      type_id: payload.type_id,
      superior_uuid: payload.superior_uuid,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      deletedAt: payload.deletedAt,
    };
  }
}
