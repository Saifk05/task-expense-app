import { CategoryType } from "@prisma/client";

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
          "Daily Wages",
          "Overtime Pay",
          "Bonus",
          "Commission",
          "Rental Income",
          "Interest Income",
          "Dividends",
          "Pension"
        ]
      }
    ]
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
          "Meat & Fish",
          "Rice & Grains",
          "Cooking Oil",
          "Snacks",
          "Beverages",
          "Cleaning Supplies",
          "Toiletries",
          "Baby Products"
        ]
      },
      {
        name: "Household",
        subCategories: [
          "House Rent",
          "House Maintenance",
          "Furniture",
          "Appliances",
          "Repairs",
          "Plumber",
          "Electrician",
          "Carpenter",
          "House Help Salary"
        ]
      },
      {
        name: "Bills & Utilities",
        subCategories: [
          "Electricity Bill",
          "Water Bill",
          "Gas Bill",
          "Internet Bill",
          "Mobile Recharge",
          "DTH / TV Subscription",
          "Maintenance Charges"
        ]
      },
      {
        name: "Vehicle",
        subCategories: [
          "Fuel",
          "Vehicle Service",
          "Vehicle Repairs",
          "Vehicle Insurance",
          "Pollution Certificate",
          "Parking Fees",
          "Toll Charges"
        ]
      },
      {
        name: "Health",
        subCategories: [
          "Doctor Consultation",
          "Medicines",
          "Hospital Charges",
          "Lab Tests",
          "Gym Membership",
          "Health Checkup"
        ]
      },
      {
        name: "Education",
        subCategories: [
          "School Fees",
          "College Fees",
          "Books",
          "Online Courses",
          "Coaching Classes"
        ]
      }
    ]
  },

  {
    type: CategoryType.WANT,
    categories: [
      {
        name: "Shopping",
        subCategories: [
          "Clothing",
          "Electronics",
          "Home Decor",
          "Gifts",
          "Online Orders"
        ]
      },
      {
        name: "Entertainment",
        subCategories: [
          "Movies",
          "Dining Out",
          "Vacation",
          "Events",
          "Streaming Services"
        ]
      },
      {
        name: "Lifestyle",
        subCategories: [
          "Salon",
          "Spa",
          "Cosmetics",
          "Accessories"
        ]
      }
    ]
  },

  {
    type: CategoryType.SAVING,
    categories: [
      {
        name: "Savings",
        subCategories: [
          "Emergency Fund",
          "Short Term Savings",
          "Children Education Fund"
        ]
      }
    ]
  },

  {
    type: CategoryType.INVESTMENT,
    categories: [
      {
        name: "Investments",
        subCategories: [
          "Mutual Funds",
          "Stock Market",
          "Crypto",
          "Gold Investment",
          "Real Estate Investment"
        ]
      }
    ]
  }
];