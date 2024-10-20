import { IsOptional, IsInt, IsObject } from 'class-validator';
import { Prisma } from '@prisma/client';
import { BaseParamsDto } from './base-params.dto';

export class GetPostParamsDto extends BaseParamsDto {
  @IsOptional()
  @IsObject()
  cursor?: Prisma.PostWhereUniqueInput;
  @IsOptional()
  @IsObject()
  where?: Prisma.PostWhereInput;
  @IsOptional()
  @IsObject()
  orderBy?: Prisma.PostOrderByWithRelationInput;
}
