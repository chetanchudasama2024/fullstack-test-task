import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [ConfigModule.forRoot(), MenuModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
