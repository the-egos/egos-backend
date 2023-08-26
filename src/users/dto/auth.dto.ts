import { IsString } from 'class-validator';

export class SignUp {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;
}

export class SignIn {
  @IsString()
  loginId: string;

  @IsString()
  password: string;
}
