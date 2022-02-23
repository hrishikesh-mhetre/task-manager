import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    // create a row for User table
    const user = new UserEntity();
    user.username = authCredentialsDTO.username;

    // encrypt the password
    user.password = `${crypto.MD5(authCredentialsDTO.password)}`;

    // commit the row
    await user.save();
  }

  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;

    // find the user by user name
    const user = await this.findOne({ username });
    console.log(user);

    if (!user) {
      return null;
    }

    // check if user exist
    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
