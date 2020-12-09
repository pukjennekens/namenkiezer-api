import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';

const hashPassword = async (password: string) => {
  const salt = await genSaltSync(10);
  const hash = await hashSync(password, salt);

  return hash;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { default: ['ROLE_USER'] })
  roles: string[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
