// const CATEGORY_ICON_KEYWORDS: Array<{ keywords: string[]; icon: string }> = [
//   {
//     keywords: [
//       "income",
//       "salary",
//       "bonus",
//       "commission",
//       "dividend",
//       "pension",
//       "freelance",
//       "business income",
//       "interest income",
//     ],
//     icon: "wallet-outline",
//   },
//   {
//     keywords: [
//       "grocery",
//       "groceries",
//       "food",
//       "vegetable",
//       "fruit",
//       "dairy",
//       "meat",
//       "fish",
//       "snack",
//       "beverage",
//       "daily needs",
//     ],
//     icon: "cart-outline",
//   },
//   {
//     keywords: [
//       "house",
//       "home",
//       "household",
//       "rent",
//       "furniture",
//       "appliance",
//       "repair",
//       "plumber",
//       "electrician",
//       "carpenter",
//     ],
//     icon: "home-outline",
//   },
//   {
//     keywords: [
//       "bill",
//       "utility",
//       "electricity",
//       "water",
//       "gas",
//       "internet",
//       "recharge",
//       "subscription",
//       "maintenance",
//     ],
//     icon: "flash-outline",
//   },
//   {
//     keywords: [
//       "vehicle",
//       "fuel",
//       "car",
//       "parking",
//       "toll",
//       "insurance",
//       "service",
//       "maintenance",
//     ],
//     icon: "car-outline",
//   },
//   {
//     keywords: [
//       "finance",
//       "loan",
//       "emi",
//       "investment",
//       "mutual fund",
//       "stock",
//       "tax",
//       "savings",
//       "credit card",
//     ],
//     icon: "cash-outline",
//   },
//   {
//     keywords: [
//       "health",
//       "doctor",
//       "medicine",
//       "hospital",
//       "lab",
//       "gym",
//       "checkup",
//       "medical",
//     ],
//     icon: "medkit-outline",
//   },
//   {
//     keywords: [
//       "education",
//       "school",
//       "college",
//       "book",
//       "course",
//       "coaching",
//     ],
//     icon: "school-outline",
//   },
//   {
//     keywords: [
//       "shopping",
//       "clothing",
//       "electronics",
//       "gift",
//       "order",
//       "bag",
//     ],
//     icon: "bag-outline",
//   },
//   {
//     keywords: [
//       "family",
//       "personal",
//       "marriage",
//       "birthday",
//       "travel",
//       "vacation",
//       "entertainment",
//       "dining",
//     ],
//     icon: "people-outline",
//   },
//   {
//     keywords: [
//       "emergency",
//       "breakdown",
//       "unexpected",
//       "legal",
//       "warning",
//     ],
//     icon: "warning-outline",
//   },
//   {
//     keywords: ["farming", "agriculture", "seed", "fertilizer", "pesticide"],
//     icon: "leaf-outline",
//   },
// ];
import { CategoryType } from "@prisma/client";

/* ------------------------------------------------ */
/* CATEGORY ICON KEYWORD MATCHING */
/* ------------------------------------------------ */

const CATEGORY_ICON_KEYWORDS = [
  {
    icon: "wallet-outline",
    keywords: [
      "income","salary","bonus","commission","dividend","freelance",
      "pension","interest","paycheck","earnings","profit"
    ],
  },
  {
    icon: "cart-outline",
    keywords: [
      "grocery","food","vegetable","fruit","meat","snack",
      "restaurant","dining","cafe","coffee","pizza","burger"
    ],
  },
  {
    icon: "home-outline",
    keywords: [
      "home","house","rent","furniture","appliance",
      "repair","plumber","electrician","maintenance"
    ],
  },
  {
    icon: "flash-outline",
    keywords: [
      "bill","utility","electricity","water","gas",
      "internet","wifi","recharge","subscription",
      "netflix","spotify","prime","apple music"
    ],
  },
  {
    icon: "car-outline",
    keywords: [
      "vehicle","fuel","petrol","diesel","car","uber",
      "ola","taxi","bus","metro","train","travel"
    ],
  },
  {
    icon: "cash-outline",
    keywords: [
      "loan","emi","investment","mutual fund","stock",
      "crypto","tax","savings","credit card","debit"
    ],
  },
  {
    icon: "medkit-outline",
    keywords: [
      "health","doctor","medicine","hospital",
      "pharmacy","clinic","gym","medical"
    ],
  },
  {
    icon: "school-outline",
    keywords: [
      "education","school","college","course",
      "tuition","coaching","training","exam"
    ],
  },
  {
    icon: "bag-outline",
    keywords: [
      "shopping","clothes","fashion","electronics",
      "amazon","flipkart","gift","purchase"
    ],
  },
  {
    icon: "airplane-outline",
    keywords: [
      "flight","trip","vacation","holiday",
      "tour","tourism","hotel","booking"
    ],
  },
  {
    icon: "warning-outline",
    keywords: [
      "emergency","breakdown","unexpected",
      "legal","fine","penalty"
    ],
  },
];

const FALLBACK_ICONS = [
  "folder-outline",
  "albums-outline",
  "grid-outline",
  "layers-outline",
  "bookmark-outline",
];

/* ------------------------------------------------ */
/* NORMALIZE CATEGORY NAME */
/* ------------------------------------------------ */

export function normalizeCategoryName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/* ------------------------------------------------ */
/* AUTO GENERATE ICON BASED ON NAME */
/* ------------------------------------------------ */

export function generateCategoryIcon(name: string): string {
  const normalized = normalizeCategoryName(name).toLowerCase();

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const entry of CATEGORY_ICON_KEYWORDS) {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry.icon;
    }
  }

  if (bestMatch) return bestMatch;

  const hash = normalized
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return FALLBACK_ICONS[hash % FALLBACK_ICONS.length];
}

/* ------------------------------------------------ */
/* DEFAULT TASK CATEGORIES */
/* ------------------------------------------------ */

export const DEFAULT_TASK_CATEGORIES = [
  {
    name: "Work",
    icon: "briefcase-outline",
    color: "#93C5FD",
    subCategories: [
      { name: "Meetings" },
      { name: "Deadlines" },
      { name: "Emails" },
      { name: "Reports" },
    ],
  },
  {
    name: "Personal",
    icon: "person-outline",
    color: "#FCA5A5",
    subCategories: [
      { name: "Shopping" },
      { name: "Appointments" },
      { name: "Health" },
    ],
  },
  {
    name: "Learning",
    icon: "school-outline",
    color: "#C4B5FD",
    subCategories: [
      { name: "Courses" },
      { name: "Practice" },
      { name: "Research" },
    ],
  },
];

/* ------------------------------------------------ */
/* DEFAULT EXPENSE CATEGORIES */
/* ------------------------------------------------ */

export const DEFAULT_EXPENSE_CATEGORIES = [
  {
    type: CategoryType.INCOME,
    categories: [
      {
        name: "Income",
        subCategories: [
          "Salary",
          "Freelance Income",
          "Business Income",
          "Bonus",
          "Commission",
          "Interest Income",
        ],
      },
    ],
  },

  {
    type: CategoryType.NEED,
    categories: [
      {
        name: "Groceries & Daily Needs",
        subCategories: [
          "Vegetables",
          "Fruits",
          "Dairy Products",
          "Rice & Grains",
          "Cooking Oil",
          "Snacks",
          "Beverages",
        ],
      },
      {
        name: "Household",
        subCategories: [
          "House Rent",
          "Furniture",
          "Appliances",
          "Repairs",
          "Maintenance",
        ],
      },
      {
        name: "Bills & Utilities",
        subCategories: [
          "Electricity Bill",
          "Water Bill",
          "Gas Bill",
          "Internet Bill",
          "Mobile Recharge",
        ],
      },
      {
        name: "Transportation",
        subCategories: [
          "Fuel",
          "Taxi",
          "Bus",
          "Train",
          "Vehicle Maintenance",
        ],
      },
      {
        name: "Health",
        subCategories: [
          "Doctor Consultation",
          "Medicines",
          "Hospital Charges",
          "Gym",
        ],
      },
    ],
  },

  {
    type: CategoryType.WANT,
    categories: [
      {
        name: "Shopping",
        subCategories: [
          "Clothing",
          "Electronics",
          "Gifts",
          "Online Orders",
        ],
      },
      {
        name: "Entertainment",
        subCategories: [
          "Movies",
          "Dining Out",
          "Streaming Services",
          "Events",
        ],
      },
      {
        name: "Travel",
        subCategories: [
          "Flights",
          "Hotels",
          "Vacation",
          "Tours",
        ],
      },
    ],
  },

  {
    type: CategoryType.SAVING,
    categories: [
      {
        name: "Savings",
        subCategories: [
          "Emergency Fund",
          "Short Term Savings",
          "Children Education Fund",
        ],
      },
    ],
  },

  {
    type: CategoryType.INVESTMENT,
    categories: [
      {
        name: "Investments",
        subCategories: [
          "Stocks",
          "Mutual Funds",
          "Crypto",
          "Gold",
          "Real Estate",
        ],
      },
    ],
  },
];