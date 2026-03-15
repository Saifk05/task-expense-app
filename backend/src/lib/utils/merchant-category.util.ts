import { CategoryType } from "@prisma/client";

type MerchantCategoryMatch = {
  keywords: string[];
  category: string;
  subCategory?: string;
  type?: CategoryType;
};

const MERCHANT_CATEGORY_RULES: MerchantCategoryMatch[] = [
  {
    keywords: ["swiggy", "zomato", "pizza", "burger", "restaurant", "cafe"],
    category: "Entertainment",
    subCategory: "Dining Out",
    type: CategoryType.WANT,
  },

  {
    keywords: ["uber", "ola", "taxi", "metro", "bus", "train"],
    category: "Transportation",
    subCategory: "Taxi",
    type: CategoryType.NEED,
  },

  {
    keywords: ["amazon", "flipkart", "myntra"],
    category: "Shopping",
    subCategory: "Online Orders",
    type: CategoryType.WANT,
  },

  {
    keywords: ["electricity", "power", "bescom"],
    category: "Bills & Utilities",
    subCategory: "Electricity Bill",
    type: CategoryType.NEED,
  },

  {
    keywords: ["water bill"],
    category: "Bills & Utilities",
    subCategory: "Water Bill",
    type: CategoryType.NEED,
  },

  {
    keywords: ["netflix", "spotify", "prime"],
    category: "Entertainment",
    subCategory: "Streaming Services",
    type: CategoryType.WANT,
  },

  {
    keywords: ["hospital", "doctor", "pharmacy", "medicine"],
    category: "Health",
    subCategory: "Medicines",
    type: CategoryType.NEED,
  },
];

export function detectTransactionCategory(description: string) {
  const normalized = description.toLowerCase();

  for (const rule of MERCHANT_CATEGORY_RULES) {
    for (const keyword of rule.keywords) {
      if (normalized.includes(keyword)) {
        return {
          category: rule.category,
          subCategory: rule.subCategory,
          type: rule.type,
        };
      }
    }
  }

  return null;
}