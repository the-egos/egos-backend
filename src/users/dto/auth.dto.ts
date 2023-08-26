import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUp {
  @IsString()
  @ApiProperty({ type: String })
  loginId: string;

  @IsString()
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @ApiProperty({ type: String })
  nickname: string;
}

export class Response<T> {
  @ApiProperty({ type: Boolean })
  status: boolean;

  @ApiProperty({ type: 'object' })
  result: T;
}

export class SignUpResponse {
  @ApiProperty({ type: String })
  message: string;
}

export class SignIn {
  @IsString()
  @ApiProperty({ type: String })
  loginId: string;

  @IsString()
  @ApiProperty({ type: String })
  password: string;
}

export class SignInResponse {
  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: String })
  refreshToken: string;
}
