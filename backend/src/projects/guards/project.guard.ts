import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { projectId } = request.params;
    const user = request.user;

    if (!user) {
      return false;
    }

    const project = await this.prisma.project.findUnique({
      where: {
        id: +projectId,
        user_id: user.id,
      },
      include: {
        settings: true,
      },
    });

    if (!project) {
      return false;
    }

    request.project = project;
    return true;
  }
}
