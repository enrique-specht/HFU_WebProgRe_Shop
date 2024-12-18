import { Button } from "primereact/button";
import CartArticlePreview from "../../components/CartArticlePreview/CartArticlePreview";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Cart.scss";
import { useEffect, useState } from "react";
import { loadArticles } from "../../store/shopReducer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useAppSelector((store) => store.user.cart);
  const articles = useAppSelector((store) => store.shop.articles);
  const dispatch = useAppDispatch();
  const [articlesInCart, setArticlesInCart] = useState<Article[]>([]);
  const [priceSum, setPriceSum] = useState<number>(0);
  const [articlesSum, setArticlesSum] = useState<number>(0);
  const navigate = useNavigate();

  const getSumInfo = () => {
    let priceSum = 0;
    let articlesSum = 0;
    articlesInCart.forEach((article) => {
      if (!article.quantityInCart) return;
      priceSum += article.quantityInCart * article.price;
      articlesSum += article.quantityInCart;
    });
    setPriceSum(priceSum);
    setArticlesSum(articlesSum);
  };

  useEffect(() => {
    dispatch(loadArticles());
  }, []);

  useEffect(() => {
    const articlesInCart = articles.reduce<Article[]>(
      (filteredArticles, article) => {
        const cartArticle = cart.find(
          (cartArticle) => cartArticle.id === article._id
        );

        if (cartArticle) {
          filteredArticles.push({
            ...article,
            quantityInCart: cartArticle.quantity,
          });
        }
        return filteredArticles;
      },
      []
    );
    setArticlesInCart(articlesInCart);
  }, [cart, articles]);

  useEffect(() => {
    getSumInfo();
  }, [articlesInCart]);

  const articlesInCartHTML = articlesInCart.map((article) => (
    <CartArticlePreview {...article} key={article._id} />
  ));

  const checkoutRouterState: CheckoutRouterState = {
    articlesForCheckout: articlesInCart,
    articlesSum: articlesSum,
    priceSum: priceSum,
  };

  return (
    <div className="Cart">
      <h1>Einkaufswagen</h1>
      <div className="cart-wrapper">
        <div className="cart-preview">{articlesInCartHTML}</div>
        <div className="sidebar">
          <span>
            Zwischensumme ({articlesSum} Artikel):
            <span className="price-sum">{priceSum.toFixed(2)} €</span>
          </span>
          <Button
            label="Zur Kasse"
            disabled={cart.length === 0}
            onClick={() =>
              navigate("/checkout", { state: checkoutRouterState })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
