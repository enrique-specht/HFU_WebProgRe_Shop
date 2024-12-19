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
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  cart: CartArticle[];
  orders: Order[];
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

interface User {
  firstname: string;
  lastname: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

interface CartArticle {
  id: string;
  quantity: number;
}

interface CheckoutArticle {
  articleId: string;
  quantity: number;
  price: number;
}

interface CheckoutRequest extends Array<CheckoutArticle> {}

interface Order {
  articles: CheckoutArticle[];
  orderDate: string;
  orderNr: string;
}

type PaymentMethod = "SEPA" | "creditCard";

interface CheckoutRouterState {
  articlesForCheckout: Article[];
  articlesSum: number;
  priceSum: number;
}

interface SortMethod {
  label: string;
  sortMethod: "name" | "price_up" | "price_down" | "rating";
}
