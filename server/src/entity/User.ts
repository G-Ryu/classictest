import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Refresh } from "./Refresh";
import { Music } from "./Music";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column()
  profileImage: string;

  @OneToMany(() => Music, (music) => music.uploader)
  musics: Music[];

  @OneToOne(() => Refresh, (refresh) => refresh.id)
  @JoinColumn()
  refresh: Refresh;
}
