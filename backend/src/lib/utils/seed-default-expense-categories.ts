import { Prisma } from "@prisma/client";
import { DEFAULT_EXPENSE_CATEGORIES } from "./default-expense-categories.util";
import {
  generateCategoryIcon,
  generateCategoryColor,
} from "./category-icon.util";

export async function seedUserExpenseCategories(
  userId: string,
  tx: Prisma.TransactionClient
) {
  for (const group of DEFAULT_EXPENSE_CATEGORIES) {

    for (const category of group.categories) {

      const parent = await tx.category.create({
        data: {
          name: category.name,
          type: group.type,
          userId,
          parentId: null,
          icon: generateCategoryIcon(category.name),
          color: generateCategoryColor(category.name),
        },
      });

      for (const sub of category.subCategories) {

        await tx.category.create({
          data: {
            name: sub,
            type: group.type,
            userId,
            parentId: parent.id,
            icon: generateCategoryIcon(sub),
            color: generateCategoryColor(sub),
          },
        });

      }

    }

  }

  console.log("✅ Default expense categories seeded for user:", userId);
}