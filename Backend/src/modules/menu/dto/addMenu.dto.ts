import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMenuDto {
  @ApiProperty({
    description: 'Unique identifier for the menu item',
    example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @ApiProperty({
    description: 'The depth level of the menu item in the hierarchy',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  depth: number;

  @ApiProperty({
    description: 'The parent menu ID if first time then add null',
    example: null,
  })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({
    description: 'The name of the menu item',
    example: 'Dashboard',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
