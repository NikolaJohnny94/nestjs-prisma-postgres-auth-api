import { IsOptional, IsInt } from 'class-validator';

export class BaseParamsDto {
  @IsOptional()
  @IsInt()
  skip?: number;
  @IsOptional()
  @IsInt()
  take?: number;
}
