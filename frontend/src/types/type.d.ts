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

interface UserReducer {
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface SignupRequest {
  firstname: string;
  lastname: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
