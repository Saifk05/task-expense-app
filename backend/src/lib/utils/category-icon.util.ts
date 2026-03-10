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

export function normalizeCategoryName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

// export function generateCategoryIcon(name: string): string {
//   const normalized = normalizeCategoryName(name).toLowerCase();

//   for (const entry of CATEGORY_ICON_KEYWORDS) {
//     if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
//       return entry.icon;
//     }
//   }

//   const hash = normalized
//     .split("")
//     .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

//   return FALLBACK_ICONS[hash % FALLBACK_ICONS.length];
// }

export function generateCategoryIcon(name: string): string {
  const normalized = normalizeCategoryName(name).toLowerCase();

  let bestMatch = null;
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