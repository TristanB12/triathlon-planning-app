import { Prisma } from "@prisma/client"

export const userAgeCustomField = Prisma.defineExtension({
  name: "userAgeCustomField",
  result: {
    user: {
      age: {
        needs: { birth_date: true },
        compute(user) {
          if (!user.birth_date) return null;

          const today = new Date();

          return today.getFullYear() - user.birth_date.getFullYear();
        },
      },
    },
  },
});