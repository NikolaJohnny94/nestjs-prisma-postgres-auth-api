//Validators
import { IsOptional, IsEnum } from 'class-validator';
//DTOs
import { UpdateProfileDto } from './update-profile.dto';
//Types
import { Role } from '@prisma/client';
export class UpdateUserDto extends UpdateProfileDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
