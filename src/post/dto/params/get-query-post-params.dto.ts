import { IsOptional, IsObject } from 'class-validator';
import { BaseParamsDto } from './base-params.dto';

export class GetQueryPostParamsDto extends BaseParamsDto {
  @IsOptional()
  @IsObject()
  cursor?: string;
  @IsOptional()
  @IsObject()
  where?: string;
  @IsOptional()
  @IsObject()
  orderBy?: string;
}
