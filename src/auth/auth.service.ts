import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //register function
  async register(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  //login function
  async login(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
