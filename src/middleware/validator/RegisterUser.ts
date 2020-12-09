import { IsString, Length } from 'class-validator';

import { IsUserAlreadyExist } from './UniqueUsername';

export class RegisterUser {
  @IsString()
  @Length(6)
  @IsUserAlreadyExist()
  username: string;

  @IsString()
  @Length(6)
  password: string;
}
