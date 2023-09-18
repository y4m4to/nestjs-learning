import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // FIXME: リクエストボディの形を定義するためにDTOクラスを使う
  // https://docs.nestjs.com/techniques/validation
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.singIn(signInDto.username, signInDto.password);
  }
}
