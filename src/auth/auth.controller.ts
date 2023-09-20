import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "./constants";

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

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    console.log(111111);
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return [];
  }
}
