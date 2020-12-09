import { IsString, Length, IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
