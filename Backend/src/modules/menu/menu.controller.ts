import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { AddMenuDto } from './dto/addMenu.dto';
import { Response } from 'express';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  @ApiOperation({
    description: 'Add new menu section.',
  })
  async addNew(@Body() addMenuDto: AddMenuDto, @Res() res: Response) {
    try {
      const newMenu = await this.menuService.create(addMenuDto);

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Menu created successfully',
        data: newMenu,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the menu',
        error: error.message,
      });
    }
  }

  @Get(':menuId?')
  @ApiOperation({
    description:
      'Get menu section(s). If menuId is provided, retrieve a specific menu.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Menu retrieved successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while fetching the menu.',
  })
  async getMenus(@Res() res: Response, @Param('menuId') menuId?: string) {
    try {
      const menus = await this.menuService.findMenus(menuId);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Menus retrieved successfully',
        data: menus,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the menu',
        error: error.message,
      });
    }
  }

  @Patch(':menuId')
  @ApiOperation({ description: 'Update a specific menu section.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Menu updated successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while updating the menu.',
  })
  async updateMenu(
    @Res() res: Response,
    @Param('menuId') menuId: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    try {
      const updatedMenu = await this.menuService.updateMenu(
        menuId,
        updateMenuDto,
      );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Menu updated successfully',
        data: updatedMenu,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while updating the menu',
        error: error.message,
      });
    }
  }

  @Delete(':menuId')
  @ApiOperation({ description: 'Delete a specific menu section.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Menu deleted successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while deleting the menu.',
  })
  async deleteMenu(@Res() res: Response, @Param('menuId') menuId: string) {
    try {
     const deleted = await this.menuService.deleteMenu(menuId);
      return res.status(HttpStatus.ACCEPTED).send(deleted);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while deleting the menu',
        error: error.message,
      });
    }
  }
}
