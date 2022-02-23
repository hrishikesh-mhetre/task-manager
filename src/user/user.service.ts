import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    // for creating jwt token
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    return this.userRepository.signup(authCredentialsDTO);
  }
  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    const user = await this.userRepository.signin(authCredentialsDTO);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // create the JWT token
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    // create and return the token
    const token = await this.jwtService.sign(payload);

    // return the token
    return { token };
  }
}
