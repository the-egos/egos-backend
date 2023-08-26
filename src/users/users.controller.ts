import { JwtService } from '@nestjs/jwt';
import { SignIn, SignUp } from './dto/auth.dto';
import { UsersService } from './users.service';
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('/sign_up')
  async signUp(@Body() body: SignUp) {
    const { loginId, password, nickname } = body;

    const hasLoginId = await this.usersService.findLoginId(loginId);

    if (hasLoginId) {
      throw new ConflictException({
        status: false,
        message: '사용중인 로그인 아이디 입니다.',
      });
    }

    const hasNickname = await this.usersService.findNickname(nickname);

    if (hasNickname) {
      throw new ConflictException({
        status: false,
        message: '사용중인 닉네임 입니다.',
      });
    }

    const userEntity = await this.usersService.signUp(
      loginId,
      password,
      nickname,
    );

    return {
      status: true,
      result: {
        ...userEntity,
        password: undefined,
      },
    };
  }

  @Post('/sign_in')
  async signIn(@Body() body: SignIn) {
    const { loginId, password } = body;

    const user = await this.usersService.findLoginId(loginId);

    if (!user) {
      throw new UnauthorizedException({
        status: false,
        message: '아이디와 패스워드를 확인해주세요.',
      });
    }

    const passwordConfirm = bcrypt.compareSync(password, user.password);

    if (!passwordConfirm) {
      throw new UnauthorizedException({
        status: false,
        message: '아이디와 패스워드를 확인해주세요.',
      });
    }

    const payload = { sub: user.id, nickname: user.nickname };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return {
      status: true,
      result: { accessToken, refreshToken },
    };
  }
}
