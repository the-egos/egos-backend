import { JwtService } from '@nestjs/jwt';
import {
  Response,
  SignIn,
  SignInResponse,
  SignUp,
  SignUpResponse,
} from './dto/auth.dto';
import { UsersService } from './users.service';
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('/sign_up')
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({
    description: '유저를 생성한다.',
    type: Response<SignUpResponse>,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
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
        message: '회원가입이 되었습니다.',
      },
    };
  }

  @Post('/sign_in')
  @HttpCode(200)
  @ApiOkResponse({
    description: '로그인.',
    type: Response<SignInResponse>,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
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
