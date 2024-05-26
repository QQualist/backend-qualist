import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as brcypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await brcypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect',
    );
  }

  login(user: User): UserToken {
    // Transform user in JWT
    const payload: UserPayload = {
      sub: user.uuid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      canChangeQa: user.canChangeQa,
      sendNonConformitiesToEmail: user.sendNonConformitiesToEmail,
      departament_uuid: user.departament?.uuid,
      creator_uuid: user.creator?.uuid,
      role_uuid: user.role?.uuid,
      type_id: user.type.id,
      superior_uuid: user.superior?.uuid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }
}
