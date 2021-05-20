import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  singer: string;

  @Column()
  track: string;

  @Column()
  filePath: string;

  @Column()
  album: string;

  @Column()
  poster: string;

  @ManyToOne(() => User, (user) => user.musics, { cascade: true })
  uploader: User;
}
