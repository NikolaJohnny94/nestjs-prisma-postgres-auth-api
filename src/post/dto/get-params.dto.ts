import { IsOptional, IsInt, IsObject } from 'class-validator';
import { Prisma } from '@prisma/client';
export class GetPostsParamsDto {
  @IsOptional()
  @IsInt()
  skip?: number;
  @IsOptional()
  @IsInt()
  take?: number;
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
