import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Length(1, 254)
  email: string;

  @IsString()
  @Length(1, 256)
  passwordHash: string;

  @IsOptional()
  @IsInt()
  failedLoginAttempts: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @IsOptional()
  @IsDate()
  dob: Date;

  @IsOptional()
  @IsString()
  profliePicture: string;

  @IsOptional()
  @IsInt()
  roleId: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsDate()
  emailVerifiedAt: Date;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone: string;
}
