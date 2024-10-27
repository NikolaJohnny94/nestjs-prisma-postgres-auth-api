import { IsOptional, IsInt, IsObject } from 'class-validator';
import { Prisma } from '@prisma/client';
export class GetUserParamsDto {
  @IsOptional()
  @IsInt()
  skip?: number;
  @IsOptional()
  @IsInt()
  take?: number;
  @IsOptional()
  @IsObject()
  cursor?: Prisma.UserWhereUniqueInput;
  @IsOptional()
  @IsObject()
  where?: Prisma.UserWhereInput;
  @IsOptional()
  @IsObject()
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
