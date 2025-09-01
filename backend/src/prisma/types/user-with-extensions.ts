import { PrismaService } from "../prisma.service";

export type UserWithExtensions = Awaited<ReturnType<PrismaService['user']['findUnique']>>;