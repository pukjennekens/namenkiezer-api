import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  names: string[];

  @Column('simple-array')
  tempPickedNames: string[];

  @ManyToOne(() => User)
  owner: User;
}
