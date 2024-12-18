import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

class DashboardItem {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsArray()
  positions: [number, number][];
}

export class CreateDashboardDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DashboardItem)
  @ArrayMinSize(1)
  items: DashboardItem[];
}
