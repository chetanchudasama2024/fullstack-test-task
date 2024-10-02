import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddMenuDto } from './dto/addMenu.dto';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from '@prisma/client';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(addMenuDto: AddMenuDto) {
    try {
      const menuId = addMenuDto.menuId || uuidv4();

      return this.prisma.menu.create({
        data: {
          menuId,
          name: addMenuDto.name,
          parentId: addMenuDto.parentId,
          depth: addMenuDto.depth,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMenus(menuId?: string): Promise<Menu | Menu[]> {
    try {
      if (menuId) {
        const menu = await this.prisma.menu.findUnique({
          where: { menuId },
          include: {
            parent: true,
          },
        });

        if (!menu) {
          throw new NotFoundException(`Menu with ID ${menuId} not found`);
        }

        return menu;
      }
      return await this.prisma.menu.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateMenu(
    menuId: string,
    updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { menuId },
      });

      if (!menu) {
        throw new NotFoundException(`Menu with ID ${menuId} not found`);
      }

      return await this.prisma.menu.update({
        where: { menuId },
        data: {
          name: updateMenuDto.name,
          depth: updateMenuDto.depth,
          parentId: updateMenuDto.parentId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteMenu(menuId: string): Promise<Menu> {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { menuId },
      });

      if (!menu) {
        throw new NotFoundException(`Menu with ID ${menuId} not found`);
      }

      return await this.prisma.menu.delete({
        where: { menuId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
