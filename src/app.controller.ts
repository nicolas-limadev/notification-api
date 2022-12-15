import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { createNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Get(":id")
  async retrieve(id: string) {
    return await this.prisma.notification.findFirst({
      where: {
        id: id
      }
    });
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

  @Delete(":id")
  async delete(id: string) {

    const deletedNotification = await this.prisma.notification.findFirst({
      where: {
        id: id
      }
    });

    return {
      message: "Deleted", deletedNotification
    }
  }
}
