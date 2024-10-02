import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty({
    description: 'The name of the menu item',
    example: 'Dashboard',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The depth level of the menu item in the hierarchy',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  depth?: number;

  @ApiProperty({
    description: 'The parent menu ID if first time then add null',
    example: null,
  })
  @IsOptional()
  @IsString()
  parentId?: string;
}
