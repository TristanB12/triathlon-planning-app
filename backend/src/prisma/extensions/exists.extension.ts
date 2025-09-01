import { Prisma } from "@prisma/client";

export const existsExtension = Prisma.defineExtension({
  name: 'exists-extension',
  model: {
    $allModels: {
      async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
        const context = Prisma.getExtensionContext(this);
        const count = await (context as any).count({
          where,
          take: 1
        } as Prisma.Args<T, 'count'>);
        return count > 0;
      }
    }
  }
});