import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signUp(loginId: string, password: string, nickname: string) {
    const userEntity = this.usersRepository.create({
      loginId,
      password,
      nickname,
    });

    return await this.usersRepository.save(userEntity);
  }

  async findLoginId(loginId: string) {
    return await this.usersRepository.findOne({ where: { loginId } });
  }

  async findNickname(nickname: string) {
    return await this.usersRepository.findOne({ where: { nickname } });
  }
}
