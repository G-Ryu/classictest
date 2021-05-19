import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Refresh extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ nullable: true })
  hashedIdx: string;

  @OneToOne(() => User, (user) => user.refresh, { cascade: true })
  user: User
}
