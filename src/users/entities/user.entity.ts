import { type } from "os";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid", {
    comment: "一意な識別子としてUUIDを使用",
  })
  readonly id: number;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", { length: 254 })
  email: string;

  @Column("varchar", { length: 256 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt: Date;

  @Column({ type: "int", default: 0 })
  failedLoginAttempts: number;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @Column({ type: "text", nullable: true })
  profliePicture: string;

  @Column({ nullable: true })
  roleId: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "timestamp", nullable: true })
  emailVerifiedAt: Date;

  @Column({ length: 15, nullable: true })
  phone: string;

  constructor(name: string) {
    this.name = name;
  }
}
