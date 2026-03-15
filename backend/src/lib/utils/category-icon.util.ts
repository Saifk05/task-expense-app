  import { CategoryType } from "@prisma/client";

  /* ------------------------------------------------ */
  /* CATEGORY ICON KEYWORD MATCHING */
  /* ------------------------------------------------ */

  // const CATEGORY_ICON_KEYWORDS = [
  //   {
  //     icon: "wallet-outline",
  //     keywords: [
  //       "income","salary","bonus","commission","dividend","freelance",
  //       "pension","interest","paycheck","earnings","profit"
  //     ],
  //   },
  //   {
  //     icon: "cart-outline",
  //     keywords: [
  //       "grocery","food","vegetable","fruit","meat","snack",
  //       "restaurant","dining","cafe","coffee","pizza","burger"
  //     ],
  //   },
  //   {
  //     icon: "home-outline",
  //     keywords: [
  //       "home","house","rent","furniture","appliance",
  //       "repair","plumber","electrician","maintenance"
  //     ],
  //   },
  //   {
  //     icon: "flash-outline",
  //     keywords: [
  //       "bill","utility","electricity","water","gas",
  //       "internet","wifi","recharge","subscription",
  //       "netflix","spotify","prime","apple music"
  //     ],
  //   },
  //   {
  //     icon: "car-outline",
  //     keywords: [
  //       "vehicle","fuel","petrol","diesel","car","uber",
  //       "ola","taxi","bus","metro","train","travel"
  //     ],
  //   },
  //   {
  //     icon: "cash-outline",
  //     keywords: [
  //       "loan","emi","investment","mutual fund","stock",
  //       "crypto","tax","savings","credit card","debit"
  //     ],
  //   },
  //   {
  //     icon: "medkit-outline",
  //     keywords: [
  //       "health","doctor","medicine","hospital",
  //       "pharmacy","clinic","gym","medical"
  //     ],
  //   },
  //   {
  //     icon: "school-outline",
  //     keywords: [
  //       "education","school","college","course",
  //       "tuition","coaching","training","exam"
  //     ],
  //   },
  //   {
  //     icon: "bag-outline",
  //     keywords: [
  //       "shopping","clothes","fashion","electronics",
  //       "amazon","flipkart","gift","purchase"
  //     ],
  //   },
  //   {
  //     icon: "airplane-outline",
  //     keywords: [
  //       "flight","trip","vacation","holiday",
  //       "tour","tourism","hotel","booking"
  //     ],
  //   },
  //   {
  //     icon: "warning-outline",
  //     keywords: [
  //       "emergency","breakdown","unexpected",
  //       "legal","fine","penalty"
  //     ],
  //   },
  // ];

  const CATEGORY_ICON_KEYWORDS = [
    {
      icon: "wallet-outline",
      keywords: [
        "income","salary","bonus","commission","dividend",
        "freelance","pension","interest","earnings","profit",
        "paycheck","business income"
      ],
    },

    {
      icon: "card-outline",
      keywords: [
        "upi","gpay","google pay","phonepe","paytm",
        "payment","bank transfer","card payment"
      ],
    },

    {
      icon: "cart-outline",
      keywords: [
        "grocery","groceries","food","vegetable","fruit",
        "meat","snack","supermarket","daily needs"
      ],
    },

    {
      icon: "fast-food-outline",
      keywords: [
        "restaurant","dining","pizza","burger","cafe",
        "coffee","swiggy","zomato","food order"
      ],
    },

    {
      icon: "bag-outline",
      keywords: [
        "shopping","clothes","fashion","electronics",
        "amazon","flipkart","myntra","purchase","gift"
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
        "vehicle","fuel","petrol","diesel","car",
        "uber","ola","taxi","bus","metro","train",
        "travel","transport"
      ],
    },

    {
      icon: "medkit-outline",
      keywords: [
        "health","doctor","medicine","hospital",
        "pharmacy","clinic","medical","lab","test"
      ],
    },

    {
      icon: "school-outline",
      keywords: [
        "education","school","college","course",
        "tuition","coaching","training","exam","book"
      ],
    },

    {
      icon: "airplane-outline",
      keywords: [
        "flight","trip","vacation","holiday",
        "tour","tourism","hotel","booking","travel"
      ],
    },

    {
      icon: "cash-outline",
      keywords: [
        "loan","emi","investment","mutual fund",
        "stock","crypto","tax","savings","gold"
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

  //

  const CATEGORY_COLORS: Record<string, string> = {
    income: "#DCFCE7",
    grocery: "#FEF3C7",
    home: "#DBEAFE",
    bill: "#E0E7FF",
    vehicle: "#FEE2E2",
    health: "#D1FAE5",
    education: "#EDE9FE",
    shopping: "#FCE7F3",
    entertainment: "#FFEDD5",
    travel: "#CFFAFE",
    savings: "#CCFBF1",
    investment: "#F3E8FF",
  };

  export function generateCategoryColor(name: string): string {
    const normalized = name.toLowerCase();

    for (const key of Object.keys(CATEGORY_COLORS)) {
      if (normalized.includes(key)) {
        return CATEGORY_COLORS[key];
      }
    }

    return "#F1F5F9"; // fallback light gray
  }