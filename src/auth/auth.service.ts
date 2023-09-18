import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async singIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    // FIXME: ハッシュ化されたパスワードを復元する
    if (user?.passwordHash !== password) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    return result;
  }
}
