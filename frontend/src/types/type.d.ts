interface Article {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  href: string;
  quantity: number;
  rating: number;
  shortdescription: string;
  description: string;
  subcategory: string;
}

interface Category {
  _id: string;
  subcategoryIds: string[];
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
}

interface ShopReducer {
  articles: Article[];
  categories: Category[];
}
