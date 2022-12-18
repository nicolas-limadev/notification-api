import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { createNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: createNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }

  @Get(':id')
  async retrieve(@Param('id') id: string) {
    return await this.prisma.notification.findFirst({
      where: {
        id: id,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedNotification = await this.prisma.notification.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Deleted',
      deletedNotification,
    };
  }
}
