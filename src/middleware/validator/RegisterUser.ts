import { IsString, Length, IsNotEmpty } from 'class-validator';

import { IsUserAlreadyExist } from './UniqueUsername';

export class RegisterUser {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  @IsUserAlreadyExist()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
