import { Ionicons } from "@expo/vector-icons";

interface Category {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const categories: Category[] = [
  {
    name: "Groceries",
    icon: "basket",
    description: "Daily essentials",
  },
  {
    name: "Vegetables",
    icon: "leaf",
    description: "Fresh & organic",
  },

  {
    name: "Food",
    icon: "restaurant",
    description: "Ready to eat",
  },

  {
    name: "Medicine",
    icon: "medical",
    description: "Health & wellness",
  },
];

export default categories;
