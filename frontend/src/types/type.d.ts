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
  quantityInCart?: number;
}

interface Category {
  _id: string;
  subcategoryIds: string[];
  name: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  _id: string;
  name: string;
}

interface ShopReducer {
  articles: Article[];
  categories: Category[];
  isLoading: boolean;
}

interface UserReducer {
  isLoggedIn: boolean;
  isLoading: boolean;
  cart: CartArticle[];
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

interface CartArticle {
  id: string;
  quantity: number;
}
