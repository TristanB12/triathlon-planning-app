import { Prisma } from '@prisma/client';

const ProjectWithSettings = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { settings: true },
});

export type ProjectWithSettings = Prisma.ProjectGetPayload<
  typeof ProjectWithSettings
>;
