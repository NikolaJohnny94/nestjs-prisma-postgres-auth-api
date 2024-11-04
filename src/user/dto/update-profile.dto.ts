// Decorators
import { StrictValidation } from 'src/shared/decorators';
//DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
//Types
import { Role } from '@prisma/client';
//Swagger
import { PartialType } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateUserDto) {
  @StrictValidation({ message: 'The role field is not allowed' }) role?: Role;
}
