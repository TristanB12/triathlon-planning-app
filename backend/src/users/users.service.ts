import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        omit: {
          password: true,
          refresh_token: true
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
